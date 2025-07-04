import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, QueryRunner, Repository } from 'typeorm'
import { ClientLedgerModel } from './entity/client-ledger.entity'
import { CreateClientLedgerDto } from './dto/create-client-ledger.dto'
import { plainToInstance } from 'class-transformer'
import { ClientModel } from 'src/client/entity/client.entity'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'
import { validate } from 'class-validator'
import { ClientService } from 'src/client/client.service'

@Injectable()
export class ClientLedgerService {
  constructor(
    @InjectRepository(ClientLedgerModel)
    private readonly clientLedgerRepo: Repository<ClientLedgerModel>,

    private readonly clientService: ClientService
  ) {}

  async getClientLedger() {
    return await this.clientLedgerRepo.find({
      order: { id: 'ASC' }
    })
  }

  async getClientLedgerById(id: number) {
    const client = await this.clientService.getOneClientById(id)

    const result = await this.clientLedgerRepo.find({
      where: {
        client: client.name,
        details: Not(IsNull()),
        cl_bk_supply_price: Not(IsNull())
      },
      order: { id: 'ASC' }
    })
    return result
  }

  async postClientLedger(data: BookDeliveryModel[], qr?: QueryRunner) {
    const newData = this.sortClientLedgerProps(data)
    const repository = this.getRepository(qr)

    // 매출처 관련 프로퍼티만 찾아낸 뒤 저장
    const dtoInstances = newData.map((row) => plainToInstance(CreateClientLedgerDto, row))

    // 매출처 저장
    const ledger = await repository.save(dtoInstances)
    const result = ledger.map((item) => item.id)

    return ledger
  }

  async createClientLedger(data: CreateClientLedgerDto, qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    const instance = plainToInstance(CreateClientLedgerDto, data)

    // 유효성 검사
    await this.initValidation(instance)

    // const findOptions = this.buildFindOptions(instance)
    // const find = await repository.findOne({
    //   where: { ...findOptions, cl_our_revenue: Not(IsNull()) }
    // })

    try {
      const result = await repository.save(instance)
      return result
    } catch (error) {
      throw new BadRequestException(`Failed to create/update client ledger: ${error.message}`)
    }
  }

  private async initValidation(instance) {
    // 유효성 검사
    const validationErrors: any[] = []
    const errors = await validate(instance, {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
    if (errors.length > 0) {
      const result = errors.map((error) => {
        return { ...error.constraints }
      })
      validationErrors.push(result)
    }
    if (validationErrors.length > 0) {
      console.log('validationErrors: ', validationErrors)
      throw new BadRequestException(validationErrors)
    }
  }

  private buildFindOptions(dto: CreateClientLedgerDto): Partial<ClientLedgerModel> {
    const options: Partial<ClientLedgerModel> = {}
    for (const [key, value] of Object.entries(dto)) {
      if (value !== null && value !== undefined && value !== '') {
        options[key as keyof ClientLedgerModel] = value
      }
    }
    return options
  }

  private isDataEqual(existing: ClientLedgerModel, dto: CreateClientLedgerDto): boolean {
    return Object.entries(dto).every(([key, value]) => existing[key] === value)
  }

  private sortClientLedgerProps = (data) => {
    const col = TABLE_COLUMNS.find((table) => table.name === 'client_ledger')?.columns || []
    const props = col.map((item) => item.key)
    const newData = data.map((row) => {
      if (row.client_ledger) return row.client_ledger

      const obj = {
        id: row?.cl_row_id || null,
        client_id: row?.parent_company_id || null,
        cl_row_id: row?.cl_row_id || null
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
