import { Module } from '@nestjs/common'
import { UploadService } from './upload.service'
import { UploadController } from './upload.controller'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity'
import { BookDisposalModel } from 'src/book-disposal/entity/book-disposal.entity'
import { CargoUsageModel } from 'src/cargo-use/entity/cargo-usage.entity'
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity'
import { OrganizationsModule } from 'src/organization/organization.module'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { OrganizationModel } from 'src/organization/entity/organizations.entity'
import { ClientModel } from 'src/client/entity/client.entity'
import { ClientModule } from 'src/client/client.module'
import { VendorModule } from 'src/vendor/vendor.module'
import { VendorModel } from 'src/vendor/entity/vendor.entity'
import { ClientLedgerModule } from 'src/client-ledger/client-ledger.module'
import { VendorLedgerModule } from 'src/vendor-ledger/vendor-ledger.module'
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module'
import { MarkClientModule } from 'src/mark-client/mark-client.module'
import { MarkStatusModule } from 'src/mark-status/mark-status.module'

@Module({
  imports: [
    OrganizationsModule,
    ClientModule,
    ClientLedgerModule,
    VendorModule,
    VendorLedgerModule,
    BookDeliveryModule,
    MarkClientModule,
    MarkStatusModule,
    TypeOrmModule.forFeature([
      BookDeliveryModel,
      ServiceDeliveryModel,
      BookDisposalModel,
      CargoUsageModel,
      LogisticsJobModel,
      OrganizationModel,
      VendorLedgerModel,
      ClientLedgerModel,
      VendorModel,
      ClientModel
    ])
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
