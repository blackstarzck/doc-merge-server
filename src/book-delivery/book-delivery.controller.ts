import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookDeliveryService } from './book-delivery.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('book_delivery')
export class BookDeliveryController {
  constructor(private readonly bookDeliveryService: BookDeliveryService) {}

  @Get()
  getBookDelivery() {
    return this.bookDeliveryService.getBookDelivery();
  }

  @Post()
  postBookDelivery(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.bookDeliveryService.postBookDelivery(data, qr);
  }
}
