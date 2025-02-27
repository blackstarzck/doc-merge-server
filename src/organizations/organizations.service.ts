import { Injectable } from '@nestjs/common';
import { OrganizationsModel } from './entity/organizations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationNamesModel } from './entity/organization-names.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsModel)
    private readonly organizationsRepository: Repository<OrganizationsModel>,
    @InjectRepository(OrganizationNamesModel)
    private readonly organizationNamesRepository: Repository<OrganizationNamesModel>,
  ) {}

  async getOrganizations() {
    return await this.organizationsRepository.find();
  }

  async getOrganizationNames() {
    return await this.organizationNamesRepository.find();
  }

  async postOrganizations(data: OrganizationsModel[]) {
    console.log('data: ', data);

    const saved = await this.organizationsRepository.save(data);

    return saved;
  }
}
