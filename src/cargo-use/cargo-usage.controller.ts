import { Body, Controller, Get, ParseArrayPipe, Post, Query, UseInterceptors } from '@nestjs/common'
import { CargoUsageService } from './cargo-usage.service'
import { QueryRunner as QR } from 'typeorm'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('overview/cargo_usage')
export class CargoUsageController {
  constructor(private readonly cargoUseService: CargoUsageService) {}

  @Get()
  getCargoUsage() {
    return this.cargoUseService.getCargoUsage()
  }

  @Post()
  @UseInterceptors(TransationInterceptor)
  postCargoUse(@Body('document') data: any[], @QueryRunner('qr') qr: QR) {
    return this.cargoUseService.postCargoUse(data, qr)
  }

  @Post('delete')
  deleteCargoUsage(
    @Body('ids', new ParseArrayPipe({ items: Number })) ids: number[],
    @QueryRunner('qr') qr: QR
  ) {
    return this.cargoUseService.deleteCargoUsage(ids, qr)
  }
}
