import { Module } from '@nestjs/common';
import { JobsController } from './job.controller';
import { JobsService } from './job.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
