import { Module } from '@nestjs/common';
import { ReportingService } from './services/reporting.service';
import { DatabaseModule } from '../database/database.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
  providers: [ReportingService],
  exports: [ReportingService],
})
export class CronModule {}