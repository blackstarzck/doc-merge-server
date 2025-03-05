import { Injectable } from '@nestjs/common';
import { OrganizationModel } from './entity/organizations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { OrganizationNamesModel } from './entity/organization-names.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationModel)
    private readonly organizationsRepository: Repository<OrganizationModel>,
    @InjectRepository(OrganizationNamesModel)
    private readonly organizationNamesRepository: Repository<OrganizationNamesModel>,
  ) {}

  async getOrganizations() {
    return await this.organizationsRepository.find();
  }

  async getOrganizationNames() {
    return await this.organizationNamesRepository.find();
  }

  async postOrganizations(data: OrganizationModel[]) {
    const repository = this.getRepository();
    console.log('data: ', data);

    const saved = await repository.save(data);

    return saved;
  }

  getRepository(qr?: QueryRunner): Repository<OrganizationModel> {
    return qr
      ? qr.manager.getRepository<OrganizationModel>(OrganizationModel)
      : this.organizationsRepository;
  }

  async deleteOrganizations(ids: number[]) {
    return await this.organizationsRepository.delete(ids);
  }
}
