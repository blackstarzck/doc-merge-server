import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { VendorLedgerService } from './vendor-ledger.service'

@Controller('vendor_ledger')
export class VendorLedgerController {
  constructor(private readonly vendorLedgerService: VendorLedgerService) {}

  @Get(':vendorId')
  getVendorLedgerById(@Param('vendorId', ParseIntPipe) vendorId: number) {
    return this.vendorLedgerService.getVendorLedgerById(vendorId)
  }
}
