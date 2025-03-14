import { Module } from '@nestjs/common'
import { CargoUsageController } from './cargo-usage.controller'
import { CargoUsageService } from './cargo-usage.service'
import { CargoUsageModel } from './entity/cargo-usage.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([CargoUsageModel])],
  exports: [CargoUsageService],
  controllers: [CargoUsageController],
  providers: [CargoUsageService]
})
export class CargoUsageModule {}
