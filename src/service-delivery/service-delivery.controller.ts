import { Body, Controller, Get, ParseArrayPipe, Post, Query, UseInterceptors } from '@nestjs/common'
import { ServiceDeliveryService } from './service-delivery.service'
import { QueryRunner as QR } from 'typeorm'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('overview/service_delivery')
export class ServiceDeliveryController {
  constructor(private readonly serviceDeliveryService: ServiceDeliveryService) {}

  @Get()
  getServiceDelivery() {
    return this.serviceDeliveryService.getServiceDelivery()
  }

  @Post()
  @UseInterceptors(TransationInterceptor)
  postServiceDelivery(@Body('document') data: any[], @QueryRunner('qr') qr: QR) {
    return this.serviceDeliveryService.postServiceDelivery(data, qr)
  }

  @Post('delete')
  @UseInterceptors(TransationInterceptor)
  deleteServiceDelivery(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @QueryRunner('qr') qr: QR
  ) {
    return this.serviceDeliveryService.deleteServiceDelivery(ids, qr)
  }
}
