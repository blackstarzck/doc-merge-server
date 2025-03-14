import { Controller, Get } from "@nestjs/common";
import { VendorLedgerService } from "./vendor-ledger.service";

@Controller("vendor_ledger")
export class VendorLedgerController {
  constructor(private readonly vendorLedgerService: VendorLedgerService) {}

  @Get()
  getVendorLedger() {
    return this.vendorLedgerService.getVendorLedger();
  }
}
