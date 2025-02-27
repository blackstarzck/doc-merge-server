import { Controller, Get } from '@nestjs/common';
import { LogisticsJobService } from './logistics-job.service';

@Controller('logistics-job')
export class LogisticsJobController {
  constructor(private readonly logisticsJobService: LogisticsJobService) {}

  @Get()
  getLogisticsJob() {
    return this.logisticsJobService.getLogisticsJob();
  }
}
