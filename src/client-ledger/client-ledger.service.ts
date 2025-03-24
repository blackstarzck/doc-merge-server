import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'
import { CreateClientLedgerDto } from './dto/create-client-ledger.dto'
import { plainToInstance } from 'class-transformer'
import { ClientModel } from 'src/client/entity/client.entity'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'

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
    const newData = this.sortClientLedgerProps(data)
    const repository = this.getRepository(qr)

    // 매출처 관련 프로퍼티만 걸러낸 뒤 저장
    const dtoInstances = newData.map((row) => plainToInstance(CreateClientLedgerDto, row))

    const entityData = dtoInstances.map((dto) => ({
      ...dto,
      client_ledger: dto.cl_row_id ? { id: dto.cl_row_id } : null
    }))

    console.log('entityData: ', entityData)

    // 매출처 저장
    const ledger = await repository.upsert(entityData, {
      conflictPaths: ['cl_row_id'],
      skipUpdateIfNoValuesChanged: true
    })

    console.log('ledger: ', ledger)

    if (ledger.identifiers.length === 0)
      throw new BadRequestException('매출처 원장 저장에 실패하였습니다.')

    return ledger
  }

  private sortClientLedgerProps = (data) => {
    const col = TABLE_COLUMNS.find((table) => table.name === 'client_ledger')?.columns || []
    const props = col.map((item) => item.key)
    const newData = data.map((row) => {
      // if (row.clientLedger) return row.clientLedger

      const obj = {
        id: row?.cl_row_id,
        client_id: row?.parent_company_id,
        cl_row_id: row?.cl_row_id,
        bookDelivery: row?.bookDelivery
      }

      Object.entries(row).map(([key, value]) => {
        if (props.includes(key)) obj[key] = value
      })
      return obj
    })
    return newData
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
