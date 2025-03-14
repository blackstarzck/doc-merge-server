import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common'
import { CargoUsageService } from './cargo-usage.service'
import { QueryRunner as QR } from 'typeorm'

@Controller('overview/cargo_usage')
export class CargoUsageController {
  constructor(private readonly cargoUseService: CargoUsageService) {}

  @Get()
  getCargoUsage() {
    return this.cargoUseService.getCargoUsage()
  }

  @Post()
  postCargoUse(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.cargoUseService.postCargoUse(data, qr)
  }

  @Post('delete')
  deleteCargoUsage(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.cargoUseService.deleteCargoUsage(ids, qr)
  }
}
