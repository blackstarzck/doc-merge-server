import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookDeliveryController } from './book-delivery.controller'
import { BookDeliveryService } from './book-delivery.service'
import { BookDeliveryModel } from './entity/book-delivery.entity'
import { VendorLedgerModule } from 'src/vendor-ledger/vendor-ledger.module'
import { ClientLedgerModule } from 'src/client-ledger/client-ledger.module'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([BookDeliveryModel, ClientLedgerModel, VendorLedgerModel]),
    ClientLedgerModule,
    VendorLedgerModule
  ],
  exports: [BookDeliveryService],
  controllers: [BookDeliveryController],
  providers: [BookDeliveryService]
})
export class BookDeliveryModule {}
