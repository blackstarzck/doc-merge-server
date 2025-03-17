import { Module } from '@nestjs/common'
import { OrganizationsModule } from './organization/organization.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm.config'
import { BookDeliveryModule } from './book-delivery/book-delivery.module'
import { ServiceDeliveryModule } from './service-delivery/service-delivery.module'
import { BookDisposalModule } from './book-disposal/book-disposal.module'
import { LogisticsJobModule } from './logistics-job/logistics-job.module'
import { CargoUsageModule } from './cargo-use/cargo-usage.module'
import { UploadModule } from './upload/upload.module'
import { ClientModule } from './client/client.module'
import { ClientLedgerModule } from './client-ledger/client-ledger.module'
import { VendorLedgerModule } from './vendor-ledger/vendor-ledger.module'
import { VendorModule } from './vendor/vendor.module'
import { MarkClientModule } from './mark-client/mark-client.module'
import { MarkStatusModule } from './mark-status/mark-status.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrganizationsModule,
    BookDeliveryModule,
    ServiceDeliveryModule,
    BookDisposalModule,
    LogisticsJobModule,
    CargoUsageModule,
    UploadModule,
    ClientModule,
    ClientLedgerModule,
    VendorModule,
    VendorLedgerModule,
    MarkClientModule,
    MarkStatusModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
