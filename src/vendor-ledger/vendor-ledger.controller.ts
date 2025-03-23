import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common'
import { VendorLedgerService } from './vendor-ledger.service'
import { CreateVendorLedgerDto } from './dto/create-vendor-ledger.dto'
import { QueryRunner as QR } from 'typeorm'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'

@Controller('vendor_ledger')
export class VendorLedgerController {
  constructor(private readonly vendorLedgerService: VendorLedgerService) {}

  @Get()
  getVendorLedger() {
    return this.vendorLedgerService.getVendorLedger()
  }

  @Get(':vendorId')
  getVendorLedgerById(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorLedgerService.getVendorLedgerById(vendorId)
  }

  @Post()
  postVendorLedger(@Body('data') data: BookDeliveryModel[], @Query('qr') qr: QR) {
    return this.vendorLedgerService.postVendorLedger(data, qr)
  }

  @Post(':vendorId/delete')
  deleteVendorLedger(
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @Body('ids', new ParseArrayPipe({ items: Number }))
    ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.vendorLedgerService.deleteVendorLedger(vendorId, ids, qr)
  }
}
