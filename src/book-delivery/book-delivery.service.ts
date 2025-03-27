import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsSelect, In, QueryRunner, Repository } from 'typeorm'
import { BookDeliveryModel } from './entity/book-delivery.entity'
import { plainToInstance } from 'class-transformer'
import { CreateBookDeliveryDto } from './dto/create-book-delivery.dto'
import { validate } from 'class-validator'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'

@Injectable()
export class BookDeliveryService {
  constructor(
    @InjectRepository(ClientLedgerModel)
    private readonly clientLedgerRepo: Repository<ClientLedgerModel>,

    @InjectRepository(VendorLedgerModel)
    private readonly vendorLedgerRepo: Repository<VendorLedgerModel>,

    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepository: Repository<BookDeliveryModel>
  ) {}

  async getBookDelivery() {
    const cl_col = TABLE_COLUMNS.find((table) => table.name === 'client_ledger')?.columns || []
    const vl_col = TABLE_COLUMNS.find((table) => table.name === 'vendor_ledger')?.columns || []
    const bd_col = TABLE_COLUMNS.find((table) => table.name === 'book_delivery')?.columns || []
    const clSelect = cl_col.filter(item => !['no', 'id'].includes(item.key)).map(item => `client_ledger.${item.key}`);
    const vlSelect = vl_col.filter(item => !['no', 'id'].includes(item.key)).map(item => `vendor_ledger.${item.key}`);
    const bdSelect = bd_col.map(item => `book_delivery.${item.key}`);
    const data = await this.bookDeliveryRepository
    .createQueryBuilder('book_delivery')
    .leftJoinAndSelect('book_delivery.client_ledger', 'client_ledger')
    .leftJoinAndSelect('book_delivery.vendor_ledger', 'vendor_ledger')
    .select(['book_delivery.id', ...bdSelect, ...clSelect, ...vlSelect])
    .orderBy('book_delivery.id', 'ASC')
    .getMany();
    const result = data.map((item) => {
      return { ...item.client_ledger, ...item.vendor_ledger, ...item, }
    })
    return result
  }

  async postBookDelivery(data, qr?: QueryRunner) {
    const newData = this.sortBookDeliveryProps(data)
    const repository = this.getRepository(qr)
    const dtoInstances = newData.map((row) => plainToInstance(CreateBookDeliveryDto, row))

    // 유효성 검사
    await this.initValidation(dtoInstances)

    const entityData = dtoInstances.map((dto) => ({
      ...dto,
      client_ledger: dto.cl_row_id ? { id: dto.cl_row_id } : null,
      vendor_ledger: dto.vl_row_id ? { id: dto.vl_row_id } : null
    }))

    const saved = await repository.save(entityData)
    return saved
  }

  private async initValidation(dtoInstances) {
    // 유효성 검사
    const validationErrors: any[] = []
    for (const instance of dtoInstances) {
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
    }
    if (validationErrors.length > 0) throw new BadRequestException(validationErrors)
  }

  private sortBookDeliveryProps = (data) => {
    const col = TABLE_COLUMNS.find((table) => table.name === 'book_delivery')?.columns || []
    const props = col.map((item) => item.key)
    const newData = data.map((row) => {
      const obj = {
        id: row.id,
        parent_company_id: row?.parent_company_id,
        outsourcing_company_id: row?.outsourcing_company_id,
        cl_row_id: row?.cl_row_id,
        vl_row_id: row?.vl_row_id,
        vendor_ledger: row?.vendor_ledger,
        client_ledger: row?.client_ledger
      }

      Object.entries(row).map(([key, value]) => {
        if (props.includes(key)) obj[key] = value
      })
      return obj
    })
    return newData
  }

  getRepository(qr?: QueryRunner): Repository<BookDeliveryModel> {
    return qr
      ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
      : this.bookDeliveryRepository
  }

  async deleteBookDelivery(ids: number[], qr: QueryRunner) {
    const repository = this.getRepository(qr)
    const find = await repository.find({ where: { id: In(ids) } })

    await repository.delete(ids)

    const clRepo = qr.manager.getRepository<ClientLedgerModel>(ClientLedgerModel)
    const vlRepo = qr.manager.getRepository<VendorLedgerModel>(VendorLedgerModel)

    for (let i = 0; i < find.length; i++) {
      if (find[i].cl_row_id) await clRepo.delete(find[i].cl_row_id)
      if (find[i].vl_row_id) await vlRepo.delete(find[i].vl_row_id)
    }

    return await repository.find()
  }
}
