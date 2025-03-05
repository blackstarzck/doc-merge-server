import { Injectable } from '@nestjs/common';
import { CargoUsageModel } from './entity/cargo-usage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCargoUseDto } from './dto/create-cargo-usage.dto';

@Injectable()
export class CargoUseService {
  constructor(
    @InjectRepository(CargoUsageModel)
    private readonly cargoUsageRepository: Repository<CargoUsageModel>,
  ) {}

  async getCargoUsage() {
    return await this.cargoUsageRepository.find();
  }

  async postCargoUse(data: CargoUsageModel[], qr?: QueryRunner) {
    const result: {
      data: CargoUsageModel[] | [];
      error: ValidationError[] | null;
    } = {
      data: [],
      error: null,
    };
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateCargoUseDto, row),
    );

    // 유효성 검사
    const validationErrors: ValidationError[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        validationErrors.push(...errors);
      }
    }

    console.log('validationErrors: ', validationErrors);

    if (validationErrors.length > 0) {
      result.error = validationErrors;
    }

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    console.log('entityData: ', entityData);

    result.data = await repository.save(entityData);
    return result;
  }

  getRepository(qr?: QueryRunner): Repository<CargoUsageModel> {
    return qr
      ? qr.manager.getRepository<CargoUsageModel>(CargoUsageModel)
      : this.cargoUsageRepository;
  }

  async deleteCargoUsage(ids: number[]) {
    return await this.cargoUsageRepository.delete(ids);
  }
}
