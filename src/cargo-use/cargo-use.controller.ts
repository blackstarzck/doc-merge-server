import { Controller, Get } from '@nestjs/common';
import { CargoUseService } from './cargo-use.service';

@Controller('cargo-use')
export class CargoUseController {
  constructor(private readonly cargoUseService: CargoUseService) {}

  @Get()
  getCargoUse() {
    return this.cargoUseService.getCargoUse();
  }
}
