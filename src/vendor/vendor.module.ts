import { Module } from "@nestjs/common";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";
import { VendorModel } from "./entity/vendor.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([VendorModel])],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
