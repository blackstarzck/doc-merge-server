import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookDeliveryModel])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
