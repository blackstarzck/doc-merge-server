import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceDeliveryModule } from 'src/service-delivery/service-delivery.module';
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookDeliveryModel, ServiceDeliveryModel]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
