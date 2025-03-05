import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { LogisticsJobModel } from './entity/logistics-job.entity';
import { validate, ValidationError } from 'class-validator';
import { CreaeteLogisticsJobDto } from './dto/create-logistics-job';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LogisticsJobService {
  constructor(
    @InjectRepository(LogisticsJobModel)
    private readonly logisticsJobRepository: Repository<LogisticsJobModel>,
  ) {}

  async getLogisticsJob() {
    return await this.logisticsJobRepository.find({
      order: { id: 'ASC' },
    });
  }

  async postLogisticsJob(data: LogisticsJobModel[], qr?: QueryRunner) {
    const result: {
      data: LogisticsJobModel[] | [];
      error: ValidationError[] | null;
    } = {
      data: [],
      error: null,
    };
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreaeteLogisticsJobDto, row),
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

  getRepository(qr?: QueryRunner): Repository<LogisticsJobModel> {
    return qr
      ? qr.manager.getRepository<LogisticsJobModel>(LogisticsJobModel)
      : this.logisticsJobRepository;
  }

  async deleteLogisticsJob(ids: number[]) {
    return await this.logisticsJobRepository.delete(ids);
  }
}
