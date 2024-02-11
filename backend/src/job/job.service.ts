import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Job, Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class JobsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(user: User, data: Prisma.JobCreateInput): Promise<Job> {
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
    return this.databaseService.job.findMany({
      include: {
        postedBy: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Job | null> {
    return this.databaseService.job.findUnique({
      where: { id },
      include: {
        postedBy: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async apply(user: User, jobId: number): Promise<Job> {
    const job = await this.databaseService.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Job not found.');
    }

    if (user.role !== 'CANDIDATE') {
      throw new ForbiddenException('Only candidates can apply for jobs.');
    }

    return this.databaseService.job.update({
      where: { id: jobId },
      data: { appliedBy: { connect: { id: user.id } } },
    });
  }

  async getAppliedJobs(user: User): Promise<Job[]> {
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.databaseService.job.findMany({
      where: {
        appliedBy: { some: { id: user.id } },
      },
    });
  }

  async getJobApplicants(
    jobId: number,
  ): Promise<Pick<User, 'id' | 'name' | 'email'>[]> {
    const job = await this.databaseService.job.findUnique({
      where: { id: jobId },
      include: { appliedBy: { select: { id: true, name: true, email: true } } }, // Include the appliedBy relation to fetch users who have applied
    });

    if (!job) {
      throw new NotFoundException('Job not found.');
    }

    return job.appliedBy;
  }

  async searchJobs(searchCriteria: {
    title?: string;
    name?: string;
    description?: string;
  }): Promise<Job[]> {
    const { title, name, description } = searchCriteria;

    const where = {};
    if (title) {
      where['title'] = { contains: title, mode: 'insensitive' };
    }
    if (description) {
      where['description'] = { contains: description, mode: 'insensitive' };
    }
    if (name) {
      where['postedBy'] = { name: { contains: name, mode: 'insensitive' } };
    }

    const jobs = await this.databaseService.job.findMany({
      where,
      include: {
        postedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return jobs;
  }

  async getCandidatesForRecruiter(user: User): Promise<User[]> {
    if (user.role !== 'RECRUITER') {
      throw new ForbiddenException('Only recruiters can create jobs.');
    }
    const jobs = await this.databaseService.job.findMany({
      where: { postedById: user.id },
      include: { appliedBy: true },
    });

    if (!jobs) {
      throw new NotFoundException('No jobs found');
    }

    const candidates: User[] = [];
    jobs.forEach((job) => {
      job.appliedBy.forEach((candidate) => {
        if (!candidates.find((c) => c.id === candidate.id)) {
          candidates.push(candidate);
        }
      });
    });

    return candidates;
  }
}
