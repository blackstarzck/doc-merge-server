import { Injectable } from '@nestjs/common';
import { BookDeliveryService } from 'src/book-delivery/book-delivery.service';
import { BookDisposalService } from 'src/book-disposal/book-disposal.service';
import { CargoUseService } from 'src/cargo-use/cargo-usage.service';
import { OVERVIEW_TABLES } from 'src/common/constants.ts/table.const';
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

  async getDocument(documentId) {
    const overviewTable = this.getOverviewTable(documentId);
    let getData = await this.getService(overviewTable, documentId);

    return await getData;
  }

  private getOverviewTable(documentId) {
    return OVERVIEW_TABLES.find((item) => item.name === documentId);
  }

  private async getService(table, documentId) {
    let service;
    if (table) {
      const serviceMap = {
        book_delivery: this.bookDeliveryService.getBookDelivery.bind(
          this.bookDeliveryService,
        ),
        book_disposal: this.bookDisposalService.getBookDisposal.bind(
          this.bookDisposalService,
        ),
        cargo_usage: this.cargoUseService.getCargoUsage.bind(
          this.cargoUseService,
        ),
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
      service = serviceMap[documentId];
    } else {
      service = this.organizationsService.getOrganizations.bind(
        this.organizationsService,
      );
    }
    const result = await service();
    return result;
  }

  async postDocument(data, documentId) {
    const overviewTable = this.getOverviewTable(documentId);
    return `yoyo`;
  }
}
