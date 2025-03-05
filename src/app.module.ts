import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BookDeliveryModule } from './book-delivery/book-delivery.module';
import { ServiceDeliveryModule } from './service-delivery/service-delivery.module';
import { BookDisposalModule } from './book-disposal/book-disposal.module';
import { LogisticsJobModule } from './logistics-job/logistics-job.module';
import { CargoUseModule } from './cargo-use/cargo-usage.module';
import { UploadModule } from './upload/upload.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    OrganizationsModule,
    BookDeliveryModule,
    ServiceDeliveryModule,
    BookDisposalModule,
    LogisticsJobModule,
    CargoUseModule,
    UploadModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
