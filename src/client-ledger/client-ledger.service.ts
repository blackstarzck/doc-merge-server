import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'

@Injectable()
export class ClientLedgerService {
  constructor(
    @InjectRepository(ClientLedgerModel)
    private readonly clientLedgerRepo: Repository<ClientLedgerModel>
  ) {}

  async getClientLedger(id: number) {
    return await this.clientLedgerRepo.find({
      where: { id },
      order: { id: 'ASC' }
    })
  }
}
