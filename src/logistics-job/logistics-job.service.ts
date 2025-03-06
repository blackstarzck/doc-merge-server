import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreaeteLogisticsJobDto, row),
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

  getRepository(qr?: QueryRunner): Repository<LogisticsJobModel> {
    return qr
      ? qr.manager.getRepository<LogisticsJobModel>(LogisticsJobModel)
      : this.logisticsJobRepository;
  }

  async deleteLogisticsJob(ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr);
    const result = await respository.delete(ids);
    const find = await respository.find();
    return find;
  }
}
