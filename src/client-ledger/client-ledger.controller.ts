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
import { ClientLedgerService } from './client-ledger.service'
import { QueryRunner as QR } from 'typeorm'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'

@Controller('client_ledger')
export class ClientLedgerController {
  constructor(private readonly clientLedgerService: ClientLedgerService) {}

  @Get()
  getClientLedger() {
    return this.clientLedgerService.getClientLedger()
  }

  @Get(':clientId')
  getClientLedgerById(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientLedgerService.getClientLedgerById(clientId)
  }

  @Post()
  postClientLedger(@Body('data') data: BookDeliveryModel[], @Query('qr') qr: QR) {
    return this.clientLedgerService.postClientLedger(data, qr)
  }

  @Post(':clientId/delete')
  deleteClientLedger(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body('ids', new ParseArrayPipe({ items: Number }))
    ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.clientLedgerService.deleteClientLedger(clientId, ids, qr)
  }
}
