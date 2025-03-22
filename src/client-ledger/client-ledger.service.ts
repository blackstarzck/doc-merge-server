import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'
import { CreateClientLedgerDto } from './dto/create-client-ledger.dto'
import { plainToInstance } from 'class-transformer'
import { ClientModel } from 'src/client/entity/client.entity'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'

@Injectable()
export class ClientLedgerService {
  constructor(
    @InjectRepository(ClientLedgerModel)
    private readonly clientLedgerRepo: Repository<ClientLedgerModel>,

    @InjectRepository(ClientModel)
    private readonly clientRepo: Repository<ClientModel>
  ) {}

  async getClientLedger() {
    return await this.clientLedgerRepo.find({
      order: { id: 'ASC' }
    })
  }

  async getClientLedgerById(id: number) {
    const client = await this.clientRepo.findOne({ where: { id } })

    if (!client) throw new NotFoundException(`매출처(${id}) 를 찾지 못했습니다.`)

    const result = await this.clientLedgerRepo.find({
      where: { client: client.name },
      order: { id: 'ASC' }
    })
    return result
  }

  async postClientLedger(data: BookDeliveryModel[], qr?: QueryRunner) {
    // @TODO: data 에 있는 parent_company 로 client_model 에서 name 과 id를 찾아서 넣어줘야함

    const repository = this.getRepository(qr)
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateClientLedgerDto, row, {
        excludeExtraneousValues: true // @Expose 가 필요함
      })
    )

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto)
      return entity
    })

    // 매출처 저장
    const ledger = await repository.upsert(entityData, {
      conflictPaths: ['cl_row_id'],
      skipUpdateIfNoValuesChanged: true
    })

    if (ledger.identifiers.length === 0) throw new BadRequestException('저장에 실패하였습니다.')

    const bookDelivery = data.map((data, i) => {
      if (!data.cl_row_id) {
        data.cl_row_id = ledger.identifiers[i].id
      }
      return data
    })

    return { ledger, data: bookDelivery }
  }

  getRepository(qr?: QueryRunner): Repository<ClientLedgerModel> {
    return qr
      ? qr.manager.getRepository<ClientLedgerModel>(ClientLedgerModel)
      : this.clientLedgerRepo
  }

  async deleteClientLedger(clientId: number, ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr)
    const result = await respository.delete(ids)

    if (result.affected === 0) throw new BadRequestException(`${clientId} 삭제를 실패했습니다.`)

    const find = await respository.find({
      where: { client_id: clientId },
      order: { id: 'ASC' }
    })
    return find
  }
}
