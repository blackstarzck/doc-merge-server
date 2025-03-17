import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ClientLedgerService } from './client-ledger.service'

@Controller('client_ledger')
export class ClientLedgerController {
  constructor(private readonly clientLedgerService: ClientLedgerService) {}

  @Get(':clientId')
  getClientLedgerById(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientLedgerService.getClientLedger(clientId)
  }
}
