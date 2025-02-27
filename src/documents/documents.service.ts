import { Injectable } from '@nestjs/common';
import { BookDeliveryService } from 'src/book-delivery/book-delivery.service';
import { BookDisposalService } from 'src/book-disposal/book-disposal.service';
import { CargoUseService } from 'src/cargo-use/cargo-use.service';
import { OVERVIEW_TABLES } from 'src/constants.ts/constants';
import { LogisticsJobService } from 'src/logistics-job/logistics-job.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { ServiceDeliveryService } from 'src/service-delivery/service-delivery.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly bookDeliveryService: BookDeliveryService,
    private readonly bookDisposalService: BookDisposalService,
    private readonly cargoUseService: CargoUseService,
    private readonly logisticsJobService: LogisticsJobService,
    private readonly organizationsService: OrganizationsService,
    private readonly serviceDeliveryService: ServiceDeliveryService,
  ) {}

  async getDocuments(documentId) {
    const overviewTable = OVERVIEW_TABLES.find(
      (item) => item.name === documentId,
    );
    let getData;

    console.log('received documentId: ', documentId);

    if (overviewTable) {
      const serviceMap = {
        book_delivery: this.bookDeliveryService.getBookDelivery.bind(
          this.bookDeliveryService,
        ),
        book_disposal: this.bookDisposalService.getBookDisposal.bind(
          this.bookDisposalService,
        ),
        cargo_use: this.cargoUseService.getCargoUse.bind(this.cargoUseService),
        logistics_job: this.logisticsJobService.getLogisticsJob.bind(
          this.logisticsJobService,
        ),
        organizations: this.organizationsService.getOrganizations.bind(
          this.organizationsService,
        ),
        service_delivery: this.serviceDeliveryService.getServiceDelivery.bind(
          this.serviceDeliveryService,
        ),
      };
      getData = serviceMap[documentId];
    } else {
      getData = this.organizationsService.getOrganizations.bind(
        this.organizationsService,
      );
    }

    return await getData();
  }
}
