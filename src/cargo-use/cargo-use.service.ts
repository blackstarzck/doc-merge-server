import { Injectable } from '@nestjs/common';
import { CargoUseModel } from './entity/cargo-use.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCargoUseDto } from './dto/create-cargo-use.dto';

@Injectable()
export class CargoUseService {
  constructor(
    @InjectRepository(CargoUseModel)
    private readonly cargoUseRepository: Repository<CargoUseModel>,
  ) {}

  async getCargoUse() {
    return await this.cargoUseRepository.find();
  }

  async postCargoUse(data: CargoUseModel[], qr?: QueryRunner) {
    const result: {
      data: CargoUseModel[] | [];
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

  getRepository(qr?: QueryRunner): Repository<CargoUseModel> {
    return qr
      ? qr.manager.getRepository<CargoUseModel>(CargoUseModel)
      : this.cargoUseRepository;
  }
}
