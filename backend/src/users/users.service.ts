import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async aboutMe(user: User) {
    const userData = await this.databaseService.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        role: true,
        appliedJobs: { select: { id: true } }, // Fetch only IDs of applied jobs
        postedJobs: { select: { id: true } }, // Fetch all details of posted jobs
      },
    });
    const appliedJobIds = userData.appliedJobs.map((job) => job.id);
    const postedJobIds = userData.postedJobs.map((job) => job.id);

    return {
      id: userData.id,
      name: userData.name,
      role: userData.role,
      appliedJobs: appliedJobIds,
      postedJobs: postedJobIds,
    };
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }
}
