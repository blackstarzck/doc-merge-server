import { Module } from "@nestjs/common";
import { ClientLedgerController } from "./client-ledger.controller";
import { ClientLedgerService } from "./client-ledger.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientLedgerModel } from "./entity/client-ledger.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClientLedgerModel])],
  controllers: [ClientLedgerController],
  providers: [ClientLedgerService],
})
export class ClientLedgerModule {}
