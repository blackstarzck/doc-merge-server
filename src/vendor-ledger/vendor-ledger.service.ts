import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VendorLedgerModel } from './entity/vendor-ledger.entity'

@Injectable()
export class VendorLedgerService {
  constructor(
    @InjectRepository(VendorLedgerModel)
    private readonly vendorLedgerRepo: Repository<VendorLedgerModel>
  ) {}

  async getVendorLedgerById(id: number) {
    return await this.vendorLedgerRepo.find({
      where: { id },
      order: { id: 'ASC' }
    })
  }
}
