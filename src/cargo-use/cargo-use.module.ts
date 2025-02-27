import { Module } from '@nestjs/common';
import { CargoUseController } from './cargo-use.controller';
import { CargoUseService } from './cargo-use.service';
import { CargoUseModel } from './entity/cargo-use.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CargoUseModel])],
  exports: [CargoUseService],
  controllers: [CargoUseController],
  providers: [CargoUseService],
})
export class CargoUseModule {}
