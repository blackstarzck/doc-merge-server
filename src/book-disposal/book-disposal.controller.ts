import { Body, Controller, Get, ParseArrayPipe, Post, Query, UseInterceptors } from '@nestjs/common'
import { BookDisposalService } from './book-disposal.service'
import { QueryRunner as QR } from 'typeorm'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('overview/book_disposal')
export class BookDisposalController {
  constructor(private readonly bookDisposalService: BookDisposalService) {}

  @Get()
  getBookDisposal() {
    return this.bookDisposalService.getBookDisposal()
  }

  @Post()
  @UseInterceptors(TransationInterceptor)
  postBookDisposal(@Body('document') data: any[], @QueryRunner('qr') qr: QR) {
    return this.bookDisposalService.postBookDisposal(data, qr)
  }

  @Post('delete')
  @UseInterceptors(TransationInterceptor)
  deleteBookDisposal(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @QueryRunner('qr') qr: QR
  ) {
    return this.bookDisposalService.deleteBookDisposal(ids, qr)
  }
}
