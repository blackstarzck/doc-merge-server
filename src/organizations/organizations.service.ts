import { BadRequestException, Injectable } from '@nestjs/common';
import { OrganizationsModel } from './entity/organizations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { OrganizationNamesModel } from './entity/organization-names.entity';
import { validate } from 'class-validator';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationsModel)
    private readonly organizationsRepository: Repository<OrganizationsModel>,

    @InjectRepository(OrganizationNamesModel)
    private readonly organizationNamesRepository: Repository<OrganizationNamesModel>,
  ) {}

  async getOrganizations() {
    return await this.organizationsRepository.find({
      order: { id: 'ASC' },
    });
  }

  async getOrganizationById(id: number) {
    return await this.organizationsRepository.find({
      where: { sheet_data_num: id },
      order: { id: 'ASC' },
    });
  }

  async getOrganizationNames() {
    return await this.organizationNamesRepository.find({
      order: { id: 'ASC' },
    });
  }

  async getOrganizationNameById(id: number) {
    return await this.organizationNamesRepository.findOne({
      where: { id },
    });
  }

  async postOrganizations(data: OrganizationsModel[], qr: QueryRunner) {
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateOrganizationDto, row),
    );

    // 유효성 검사
    const validationErrors: any[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints };
        });
        validationErrors.push(result);
      }
    }

    if (validationErrors.length > 0)
      throw new BadRequestException(validationErrors);

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    return await repository.save(entityData);
  }

  getRepository(qr?: QueryRunner): Repository<OrganizationsModel> {
    return qr
      ? qr.manager.getRepository<OrganizationsModel>(OrganizationsModel)
      : this.organizationsRepository;
  }

  async deleteOrganizations(ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr);
    const result = await respository.delete(ids);
    const find = await respository.find();
    return find;
  }
}
