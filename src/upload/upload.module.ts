import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDeliveryModule } from 'src/service-delivery/service-delivery.module';
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity';
import { BookDisposalModel } from 'src/book-disposal/entity/book-disposal.entity';
import { CargoUsageModel } from 'src/cargo-use/entity/cargo-usage.entity';
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity';
import { OrganizationsModel } from 'src/organizations/entity/organizations.entity';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  imports: [
    OrganizationsModule,
    TypeOrmModule.forFeature([
      BookDeliveryModel,
      ServiceDeliveryModel,
      BookDisposalModel,
      CargoUsageModel,
      LogisticsJobModel,
      OrganizationsModel,
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
