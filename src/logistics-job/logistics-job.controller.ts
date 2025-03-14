import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common'
import { LogisticsJobService } from './logistics-job.service'
import { QueryRunner as QR } from 'typeorm'

@Controller('overview/logistics_job')
export class LogisticsJobController {
  constructor(private readonly logisticsJobService: LogisticsJobService) {}

  @Get()
  getLogisticsJob() {
    return this.logisticsJobService.getLogisticsJob()
  }

  @Post()
  postLogisticsJob(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.logisticsJobService.postLogisticsJob(data, qr)
  }

  @Post('delete')
  deleteLogisticsJob(@Body('ids', new ParseArrayPipe({ items: Number })) ids: number[], qr: QR) {
    return this.logisticsJobService.deleteLogisticsJob(ids, qr)
  }
}
