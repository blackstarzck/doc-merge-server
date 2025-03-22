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
import { CreateClientLedgerDto } from './dto/create-client-ledger.dto'
import { QueryRunner as QR } from 'typeorm'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { BookDeliveryService } from 'src/book-delivery/book-delivery.service'

@Controller('client_ledger')
export class ClientLedgerController {
  constructor(
    private readonly clientLedgerService: ClientLedgerService,
    private readonly bookDeliveryService: BookDeliveryService
  ) {}

  @Get()
  getClientLedger() {
    return this.clientLedgerService.getClientLedger()
  }

  @Get(':clientId')
  getClientLedgerById(@Param('clientId', ParseIntPipe) clientId: number) {
    return this.clientLedgerService.getClientLedgerById(clientId)
  }

  @Post()
  async postClientLedger(@Body('data') datas: BookDeliveryModel[], @Query('qr') qr: QR) {
    // 매출처 저장
    const { ledger, data } = await this.clientLedgerService.postClientLedger(datas, qr)

    // 도서납품현황
    const bookDelivery = await this.bookDeliveryService.postBookDelivery(data, qr)

    return { ledger, bookDelivery }
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
