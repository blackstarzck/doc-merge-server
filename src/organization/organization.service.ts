import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { OrganizationModel } from './entity/organizations.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { OrganizationNamesModel } from './entity/organization-names.entity'
import { validate } from 'class-validator'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { plainToInstance } from 'class-transformer'
import { CreateOrganizationNameDto } from './dto/create_organization-name.dto'

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationModel)
    private readonly organizationsRepo: Repository<OrganizationModel>,

    @InjectRepository(OrganizationNamesModel)
    private readonly organizationNamesRepo: Repository<OrganizationNamesModel>
  ) {}

  async getAllOrganizations() {
    return await this.organizationsRepo.find({
      order: { id: 'ASC' }
    })
  }

  async getOrganizationById(id: number) {
    return await this.organizationsRepo.find({
      where: { sheet_data_num: id },
      order: { id: 'ASC' }
    })
  }

  async getOrganizationNames() {
    return await this.organizationNamesRepo.find({
      order: { id: 'ASC' }
    })
  }

  async getOrganizationNameById(id: number) {
    const result = await this.organizationNamesRepo.findOne({
      where: { id }
    })
    if (!result) throw new NotFoundException(`Organization ${id} not found`)
    return result
  }

  async createOrganizationName(dto: CreateOrganizationNameDto) {
    const nameExists = await this.organizationNamesRepo.exists({ where: { name: dto.name } })
    if (nameExists) throw new BadRequestException('이미 등록된 기관명입니다.')

    const instance = plainToInstance(CreateOrganizationNameDto, dto)
    const entity = this.organizationNamesRepo.create(instance)

    return await this.organizationNamesRepo.save(entity)
  }

  async postOrganizations(data: OrganizationModel[], qr: QueryRunner) {
    const repository = this.getRepository(qr)
    const dtoInstances = data.map((row) => plainToInstance(CreateOrganizationDto, row))

    // 유효성 검사
    const validationErrors: any[] = []
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints }
        })
        validationErrors.push(result)
      }
    }

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors)

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto)
      return entity
    })
    return await repository.save(entityData)
  }

  getRepository(qr?: QueryRunner): Repository<OrganizationModel> {
    return qr
      ? qr.manager.getRepository<OrganizationModel>(OrganizationModel)
      : this.organizationsRepo
  }

  async deleteOrganizations(orgId: number, ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr)
    const result = await respository.delete(ids)
    const find = await respository.find({ where: { sheet_data_num: orgId }, order: { id: 'ASC' } })
    return find
  }

  async updateOrganizationName(orgId: number, dto: CreateOrganizationNameDto) {
    const nameExists = await this.organizationNamesRepo.exists({ where: { id: orgId } })
    if (!nameExists) throw new BadRequestException('기관이 존재하지 않습니다.')

    const instance = plainToInstance(CreateOrganizationNameDto, dto)
    const entity = this.organizationNamesRepo.create(instance)
    const update = await this.organizationNamesRepo.update(orgId, { ...entity })

    if (update.affected === 0) throw new BadRequestException('기관명 정보를 수정할 수 없습니다.')
    const find = await this.organizationNamesRepo.findOne({ where: { id: orgId } })
    return find
  }
}
