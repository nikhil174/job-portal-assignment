import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Job, Prisma, User } from '@prisma/client';
import { JobsService } from './job.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private JobsService: JobsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  async findAll(): Promise<Job[]> {
    return this.JobsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Job | null> {
    return this.JobsService.findOne(+id);
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  @Post('/')
  async create(
    @GetUser() user: User,
    @Body() data: Prisma.JobCreateInput,
  ): Promise<Job> {
    return this.JobsService.create(user, data);
  }
}
