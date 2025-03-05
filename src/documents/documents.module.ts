import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { BookDeliveryModule } from 'src/book-delivery/book-delivery.module';
import { BookDisposalModule } from 'src/book-disposal/book-disposal.module';
import { CargoUseModule } from 'src/cargo-use/cargo-usage.module';
import { LogisticsJobModule } from 'src/logistics-job/logistics-job.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { ServiceDeliveryModule } from 'src/service-delivery/service-delivery.module';
import { OrganizationNamesModel } from 'src/organizations/entity/organization-names.entity';

@Module({
  imports: [
    BookDeliveryModule,
    BookDisposalModule,
    CargoUseModule,
    LogisticsJobModule,
    OrganizationsModule,
    ServiceDeliveryModule,
    OrganizationNamesModel,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
