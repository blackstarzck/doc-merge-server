import { Controller, Get, Post } from '@nestjs/common';
import { BookDeliveryService } from './book-delivery.service';

@Controller('book_delivery')
export class BookDeliveryController {
  constructor(private readonly bookDeliveryService: BookDeliveryService) {}

  @Get()
  getBookDelivery() {
    return this.bookDeliveryService.getBookDelivery();
  }

  @Post()
  postBookDelivery(data) {
    return this.bookDeliveryService.postBookDelivery(data);
  }
}
