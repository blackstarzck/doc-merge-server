import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VendorLedgerModel } from "./entity/vendor-ledger.entity";

@Injectable()
export class VendorLedgerService {
  constructor(
    @InjectRepository(VendorLedgerModel)
    private readonly vendorLedgerRepo: Repository<VendorLedgerModel>,
  ) {}

  async getVendorLedger() {
    return await this.vendorLedgerRepo.find();
  }
}
