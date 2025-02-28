import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDeliveryModule } from 'src/service-delivery/service-delivery.module';
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity';
import { BookDisposalModel } from 'src/book-disposal/entity/book-disposal.entity';
import { CargoUseModel } from 'src/cargo-use/entity/cargo-use.entity';
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookDeliveryModel,
      ServiceDeliveryModel,
      BookDisposalModel,
      CargoUseModel,
      LogisticsJobModel,
    ]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
