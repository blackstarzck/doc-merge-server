import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, QueryRunner, Repository } from 'typeorm'
import { VendorLedgerModel } from './entity/vendor-ledger.entity'
import { plainToInstance } from 'class-transformer'
import { CreateVendorLedgerDto } from './dto/create-vendor-ledger.dto'
import { VendorModel } from 'src/vendor/entity/vendor.entity'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'
import { validate } from 'class-validator'

@Injectable()
export class VendorLedgerService {
  constructor(
    @InjectRepository(VendorLedgerModel)
    private readonly vendorLedgerRepo: Repository<VendorLedgerModel>,

    @InjectRepository(VendorModel)
    private readonly vendorService: Repository<VendorModel>
  ) {}

  async getVendorLedger() {
    return await this.vendorService.find({
      order: { id: 'ASC' }
    })
  }

  async getVendorLedgerById(id: number) {
    const vendor = await this.vendorService.findOne({ where: { id } })

    if (!vendor) throw new NotFoundException(`매입처(${id}) 를 찾지 못했습니다.`)

    return await this.vendorLedgerRepo.find({
      where: { vendor: vendor.name },
      order: { id: 'ASC' }
    })
  }

  async postVendorLedger(data: BookDeliveryModel[], qr?: QueryRunner) {
    const newData = this.sortVendorLedgerProps(data)
    const repository = this.getRepository(qr)

    // 매입처 관련 프로퍼티만 걸러낸 뒤 저장
    const dtoInstances = newData.map((row) => plainToInstance(CreateVendorLedgerDto, row))

    await this.initValidation(dtoInstances)

    // 매입처 저장
    const ledger = await repository.save(dtoInstances)
    // const result = ledger.map((item) => item.id)

    return ledger
  }

  async createVendorLedger(data: CreateVendorLedgerDto, qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    const instance = plainToInstance(CreateVendorLedgerDto, data)

    // 유효성 검사
    await this.initValidation(instance)

    const findOptions = this.buildFindOptions(instance)
    const find = await repository.findOne({
      where: { bd_row_id: data.bd_row_id }
    })

    try {
      if (!find) {
        // 삽입
        const result = await repository.save(instance)
        return result
      } else if (!this.isDataEqual(find, data)) {
        // 업데이트 (값이 다를 경우)
        await repository.update(find.id, instance)
        return { ...find, ...data } // 업데이트된 객체 반환
      }
      // 동일한 데이터면 기존 데이터 반환
      return find
    } catch (error) {
      throw new BadRequestException(`Failed to create/update vendor ledger: ${error.message}`)
    }
  }

  private buildFindOptions(dto: CreateVendorLedgerDto): Partial<VendorLedgerModel> {
    const options: Partial<VendorLedgerModel> = {}
    for (const [key, value] of Object.entries(dto)) {
      if (value !== null && value !== undefined && value !== '') {
        options[key as keyof VendorLedgerModel] = value
      }
    }
    return options
  }

  private isDataEqual(existing: VendorLedgerModel, dto: CreateVendorLedgerDto): boolean {
    return Object.entries(dto).every(([key, value]) => existing[key] === value)
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
    // console.log('validationErrors: ', validationErrors)

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors)
  }

  private sortVendorLedgerProps = (data) => {
    const col = TABLE_COLUMNS.find((table) => table.name === 'vendor_ledger')?.columns || []
    const props = col.map((item) => item.key)
    const newData = data.map((row) => {
      if (row.vendor_ledger) return row.vendor_ledger

      const obj = {
        id: row.vl_row_id || null,
        vendor_id: row?.vendor_id || null,
        vl_row_id: row?.vl_row_id || null,
      }

      Object.entries(row).map(([key, value]) => {
        if (props.includes(key)) obj[key] = value
      })
      return obj
    })
    return newData
  }

  getRepository(qr?: QueryRunner): Repository<VendorLedgerModel> {
    return qr
      ? qr.manager.getRepository<VendorLedgerModel>(VendorLedgerModel)
      : this.vendorLedgerRepo
  }

  async deleteVendorLedger(vendorId: number, ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr)
    const result = await respository.delete(ids)

    if (result.affected === 0)
      throw new BadRequestException(`매출처(${vendorId}) 삭제를 실패했습니다.`)

    const find = await respository.find({
      where: { id: vendorId },
      order: { id: 'ASC' }
    })
    return find
  }
}
