import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookDisposalService } from './book-disposal.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('book_disposal')
export class BookDisposalController {
  constructor(private readonly bookDisposalService: BookDisposalService) {}

  @Get()
  getBookDisposal() {
    return this.bookDisposalService.getBookDisposal();
  }

  @Post()
  postBookDisposal(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.bookDisposalService.postBookDisposal(data, qr);
  }
}
