import { Module } from "@nestjs/common";
import { VendorLedgerController } from "./vendor-ledger.controller";
import { VendorLedgerService } from "./vendor-ledger.service";
import { VendorLedgerModel } from "./entity/vendor-ledger.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([VendorLedgerModel])],
  controllers: [VendorLedgerController],
  providers: [VendorLedgerService],
})
export class VendorLedgerModule {}
