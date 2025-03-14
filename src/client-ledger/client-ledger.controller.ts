import { Controller, Get } from "@nestjs/common";
import { ClientLedgerService } from "./client-ledger.service";

@Controller("client_ledger")
export class ClientLedgerController {
  constructor(private readonly clientLedgerService: ClientLedgerService) {}

  @Get()
  getClientLedger() {
    return this.clientLedgerService.getClientLedger();
  }
}
