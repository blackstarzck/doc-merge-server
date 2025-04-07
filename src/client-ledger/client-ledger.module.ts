import { Module } from '@nestjs/common'
import { ClientLedgerController } from './client-ledger.controller'
import { ClientLedgerService } from './client-ledger.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'
import { ClientModel } from 'src/client/entity/client.entity'
import { ClientModule } from 'src/client/client.module'

@Module({
  imports: [ClientModule, TypeOrmModule.forFeature([ClientLedgerModel, ClientModel])],
  exports: [ClientLedgerService],
  controllers: [ClientLedgerController],
  providers: [ClientLedgerService]
})
export class ClientLedgerModule {}
