import { Body, Controller, Get, ParseArrayPipe, Post, Query, UseInterceptors } from '@nestjs/common'
import { LogisticsJobService } from './logistics-job.service'
import { QueryRunner as QR } from 'typeorm'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('overview/logistics_job')
export class LogisticsJobController {
  constructor(private readonly logisticsJobService: LogisticsJobService) {}

  @Get()
  getLogisticsJob() {
    return this.logisticsJobService.getLogisticsJob()
  }

  @Post()
  @UseInterceptors(TransationInterceptor)
  postLogisticsJob(@Body('document') data: any[], @QueryRunner('qr') qr: QR) {
    return this.logisticsJobService.postLogisticsJob(data, qr)
  }

  @Post('delete')
  @UseInterceptors(TransationInterceptor)
  deleteLogisticsJob(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @QueryRunner('qr') qr: QR
  ) {
    return this.logisticsJobService.deleteLogisticsJob(ids, qr)
  }
}
