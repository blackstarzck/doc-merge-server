import { ClientLedgerService } from './../client-ledger/client-ledger.service'
import { Body, Controller, Get, Post, Query, ParseArrayPipe } from '@nestjs/common'
import { BookDeliveryService } from './book-delivery.service'
import { QueryRunner as QR } from 'typeorm'
import { VendorLedgerService } from 'src/vendor-ledger/vendor-ledger.service'

@Controller('overview/book_delivery')
export class BookDeliveryController {
  constructor(
    private readonly bookDeliveryService: BookDeliveryService,
    private readonly clientLedgerService: ClientLedgerService,
    private readonly vendorLedgerService: VendorLedgerService
  ) {}

  @Get()
  getBookDelivery() {
    return this.bookDeliveryService.getBookDelivery()
  }

  @Post()
  async postBookDelivery(@Body('document') data: any[], @Query('qr') qr: QR) {
    // 매출처 저장 (upsert, conflict key: cl_row_id)
    const cl = await this.clientLedgerService.postClientLedger(data, qr)
    // 매입처 저장 (upsert, conflict key: vl_row_id)
    const vl = await this.vendorLedgerService.postVendorLedger(data, qr)
    // 만약 cl_row_id, vl_row_id 가 없다면 추가
    const newData = data.map((data, i) => {
      if (!data.cl_row_id) data.cl_row_id = cl.identifiers[i].id
      if (!data.vl_row_id) data.vl_row_id = vl.identifiers[i].id
      return data
    })

    return this.bookDeliveryService.postBookDelivery(newData, qr)
  }

  @Post('delete')
  deleteBookDelivery(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.bookDeliveryService.deleteBookDelivery(ids, qr)
  }
}
