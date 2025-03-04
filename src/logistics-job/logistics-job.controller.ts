import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LogisticsJobService } from './logistics-job.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('logistics_job')
export class LogisticsJobController {
  constructor(private readonly logisticsJobService: LogisticsJobService) {}

  @Get()
  getLogisticsJob() {
    return this.logisticsJobService.getLogisticsJob();
  }

  @Post()
  postLogisticsJob(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.logisticsJobService.postLogisticsJob(data, qr);
  }
}
