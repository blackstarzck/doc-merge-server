import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common'
import { BookDisposalService } from './book-disposal.service'
import { QueryRunner as QR } from 'typeorm'

@Controller('overview/book_disposal')
export class BookDisposalController {
  constructor(private readonly bookDisposalService: BookDisposalService) {}

  @Get()
  getBookDisposal() {
    return this.bookDisposalService.getBookDisposal()
  }

  @Post()
  postBookDisposal(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.bookDisposalService.postBookDisposal(data, qr)
  }

  @Post('delete')
  deleteBookDisposal(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.bookDisposalService.deleteBookDisposal(ids, qr)
  }
}
