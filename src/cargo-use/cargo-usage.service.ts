import { BadRequestException, Injectable } from '@nestjs/common'
import { CargoUsageModel } from './entity/cargo-usage.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { validate, ValidationError } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { CreateCargoUseDto } from './dto/create-cargo-usage.dto'

@Injectable()
export class CargoUsageService {
  constructor(
    @InjectRepository(CargoUsageModel)
    private readonly cargoUsageRepository: Repository<CargoUsageModel>
  ) {}

  async getCargoUsage() {
    return await this.cargoUsageRepository.find({
      order: { id: 'ASC' }
    })
  }

  async postCargoUse(data: CargoUsageModel[], qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    const dtoInstances = data.map((row) => plainToInstance(CreateCargoUseDto, row))

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

  getRepository(qr?: QueryRunner): Repository<CargoUsageModel> {
    return qr
      ? qr.manager.getRepository<CargoUsageModel>(CargoUsageModel)
      : this.cargoUsageRepository
  }

  async deleteCargoUsage(ids: number[], qr: QueryRunner) {
    const repository = this.getRepository(qr)
    await repository.delete(ids)
    return await repository.find()
  }
}
