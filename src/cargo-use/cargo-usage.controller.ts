import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CargoUseService } from './cargo-usage.service';
import { QueryRunner as QR } from 'typeorm';

@Controller('cargo_usage')
export class CargoUseController {
  constructor(private readonly cargoUseService: CargoUseService) {}

  @Get()
  getCargoUsage() {
    return this.cargoUseService.getCargoUsage();
  }

  @Post()
  postCargoUse(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.cargoUseService.postCargoUse(data, qr);
  }

  @Delete(':ids')
  deleteCargoUsage(
    @Param('ids', new ParseArrayPipe({ items: Number })) ids: number[],
  ) {
    return this.cargoUseService.deleteCargoUsage(ids);
  }
}
