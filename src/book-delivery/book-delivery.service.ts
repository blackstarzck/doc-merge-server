import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { BookDeliveryModel } from './entity/book-delivery.entity'
import { plainToInstance } from 'class-transformer'
import { CreateBookDeliveryDto } from './dto/create-book-delivery.dto'
import { validate } from 'class-validator'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'

@Injectable()
export class BookDeliveryService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepository: Repository<BookDeliveryModel>
  ) {}

  async getBookDelivery() {
    // return await this.bookDeliveryRepository.find({
    //   relations: ['client_ledger'],
    //   order: { id: 'ASC' }
    // })
    const cColumns = TABLE_COLUMNS.find((table) => table.name === 'client_ledger')?.columns || []
    const vColumns = TABLE_COLUMNS.find((table) => table.name === 'vendor_ledger')?.columns || []
    const clSelect = cColumns.map((item) => 'client_ledger.' + item.key + ' AS ' + item.key)
    const vlSelect = vColumns.map((item) => 'vendor_ledger.' + item.key + ' AS ' + item.key)
    const select = ['book_delivery.*', ...clSelect, ...vlSelect]
    const result = await this.bookDeliveryRepository
      .createQueryBuilder('book_delivery')
      .leftJoinAndSelect('book_delivery.client_ledger', 'client_ledger')
      .leftJoinAndSelect('book_delivery.vendor_ledger', 'vendor_ledger')
      .select(select)
      .orderBy('book_delivery.id', 'ASC')
      .getRawMany()

    return result
  }

  async postBookDelivery(data, qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    const dtoInstances = data.map((row) => plainToInstance(CreateBookDeliveryDto, row))
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
    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto)
      return entity
    })
    return await repository.save(entityData)
  }

  getRepository(qr?: QueryRunner): Repository<BookDeliveryModel> {
    return qr
      ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
      : this.bookDeliveryRepository
  }

  async deleteBookDelivery(ids: number[], qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    await repository.delete(ids)
    return await repository.find()
  }
}
