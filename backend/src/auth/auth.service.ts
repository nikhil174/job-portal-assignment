import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: Prisma.UserCreateInput) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
          role: dto.role,
          name: dto.name,
        },
      });
      const token = await this.signToken(user.id, user.email);

      return {
        access_token: token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException(`Credentials incorrect`);

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) throw new ForbiddenException(`Credentials incorrect`);

    const token = await this.signToken(user.id, user.email);

    return {
      access_token: token,
    };
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    return this.jwt.sign(payload, {
      expiresIn: '3h',
      secret,
    });
  }
}
