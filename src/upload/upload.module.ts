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

@Module({
  imports: [
    OrganizationsModule,
    TypeOrmModule.forFeature([
      BookDeliveryModel,
      ServiceDeliveryModel,
      BookDisposalModel,
      CargoUsageModel,
      LogisticsJobModel,
      OrganizationModel,
      VendorLedgerModel,
      ClientLedgerModel
    ])
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
