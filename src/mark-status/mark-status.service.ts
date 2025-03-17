import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MarkStatusModel } from './entity/mark-status.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MarkStatusService {
  constructor(
    @InjectRepository(MarkStatusModel)
    private readonly markStatusRepo: Repository<MarkStatusModel>
  ) {}

  async getVendorLedgerById(id: number) {
    return await this.markStatusRepo.find({
      where: { id },
      order: { id: 'ASC' }
    })
  }
}
