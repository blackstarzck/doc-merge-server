import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CargoUseService } from './cargo-use.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('cargo_usage')
export class CargoUseController {
  constructor(private readonly cargoUseService: CargoUseService) {}

  @Get()
  getCargoUse() {
    return this.cargoUseService.getCargoUse();
  }

  @Post()
  postCargoUse(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.cargoUseService.postCargoUse(data, qr);
  }
}
