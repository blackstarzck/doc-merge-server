import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { ServiceDeliveryService } from './service-delivery.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('service_delivery')
export class ServiceDeliveryController {
  constructor(private readonly serviceDeliveryService: ServiceDeliveryService) {}

  @Get()
  getServiceDelivery() {
    return this.serviceDeliveryService.getServiceDelivery();
  }

  @Post()
  postServiceDelivery(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.serviceDeliveryService.postServiceDelivery(data, qr);
  }

  @Post('delete')
  deleteServiceDelivery(@Body('ids', new ParseArrayPipe({ items: Number })) ids: number[], @Query('qr') qr: QR) {
    return this.serviceDeliveryService.deleteServiceDelivery(ids, qr);
  }
}
