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
  @UseGuards(JwtGuard)
  @Get('applied')
  async getAppliedJobs(@GetUser() user: User): Promise<Job[]> {
    return this.JobsService.getAppliedJobs(user);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':jobId/applicants')
  async getJobApplicants(
    @Param('jobId') jobId: string,
  ): Promise<Pick<User, 'id' | 'name' | 'email'>[]> {
    return this.JobsService.getJobApplicants(+jobId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('search')
  async searchJobs(
    @Body()
    searchCriteria: {
      title?: string;
      name?: string;
      description?: string;
    },
  ): Promise<Job[]> {
    return this.JobsService.searchJobs(searchCriteria);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get('/candidates')
  async getCandidatesForRecruiter(@GetUser() user: User): Promise<User[]> {
    return this.JobsService.getCandidatesForRecruiter(user);
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Post('/:id/apply')
  async apply(@GetUser() user: User, @Param('id') jobId: string): Promise<Job> {
    return this.JobsService.apply(user, +jobId);
  }
}
