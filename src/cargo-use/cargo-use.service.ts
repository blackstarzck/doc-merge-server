import { Injectable } from '@nestjs/common';
import { CargoUseModel } from './entity/cargo-use.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CargoUseService {
  constructor(
    @InjectRepository(CargoUseModel)
    private readonly cargoUseRepository: Repository<CargoUseModel>,
  ) {}

  async getCargoUse() {
    return await this.cargoUseRepository.find();
  }
}
