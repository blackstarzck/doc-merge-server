import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ServiceDeliveryModel } from './entity/service-delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceDeliveryService {
  constructor(
    @InjectRepository(ServiceDeliveryModel)
    private readonly serviceDeliveryRepository: Repository<ServiceDeliveryModel>,
  ) {}

  async getServiceDelivery() {
    return await this.serviceDeliveryRepository.find();
  }
}
