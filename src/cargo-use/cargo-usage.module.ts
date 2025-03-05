import { Module } from '@nestjs/common';
import { CargoUseController } from './cargo-usage.controller';
import { CargoUseService } from './cargo-usage.service';
import { CargoUsageModel } from './entity/cargo-usage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CargoUsageModel])],
  exports: [CargoUseService],
  controllers: [CargoUseController],
  providers: [CargoUseService],
})
export class CargoUseModule {}
