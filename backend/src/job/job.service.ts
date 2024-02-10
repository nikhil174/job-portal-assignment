import { ForbiddenException, Injectable } from '@nestjs/common';
import { Job, Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class JobsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(user: User, data: Prisma.JobCreateInput): Promise<Job> {
    console.log({
      user,
      data,
    });
    if (user.role !== 'RECRUITER') {
      throw new ForbiddenException('Only recruiters can create jobs.');
    }
    const jobDataWithPostedBy: Prisma.JobCreateInput = {
      ...data,
      postedBy: {
        connect: { id: user.id },
      },
    };
    return this.databaseService.job.create({ data: jobDataWithPostedBy });
  }

  async findAll(): Promise<Job[]> {
    return this.databaseService.job.findMany();
  }

  async findOne(id: number): Promise<Job | null> {
    return this.databaseService.job.findUnique({ where: { id } });
  }

  async update() {}
}
