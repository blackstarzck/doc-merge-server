import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogisticsJobModel } from './entity/logistics-job.entity';

@Injectable()
export class LogisticsJobService {
  constructor(
    @InjectRepository(LogisticsJobModel)
    private readonly logisticsJobRepository: Repository<LogisticsJobModel>,
  ) {}

  async getLogisticsJob() {
    return await this.logisticsJobRepository.find();
  }
}
