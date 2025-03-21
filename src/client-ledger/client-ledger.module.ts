import { Module } from '@nestjs/common'
import { ClientLedgerController } from './client-ledger.controller'
import { ClientLedgerService } from './client-ledger.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'
import { ClientModel } from 'src/client/entity/client.entity'
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module'

@Module({
  imports: [BookDeliveryModule, TypeOrmModule.forFeature([ClientLedgerModel, ClientModel])],
  controllers: [ClientLedgerController],
  providers: [ClientLedgerService]
})
export class ClientLedgerModule {}
