import { Controller, Get } from '@nestjs/common';
import { ServiceDeliveryService } from './service-delivery.service';

@Controller('service-delivery')
export class ServiceDeliveryController {
  constructor(
    private readonly serviceDeliveryService: ServiceDeliveryService,
  ) {}

  @Get()
  getServiceDelivery() {
    return this.serviceDeliveryService.getServiceDelivery();
  }
}
