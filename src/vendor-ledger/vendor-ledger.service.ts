import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { VendorLedgerModel } from './entity/vendor-ledger.entity'
import { plainToInstance } from 'class-transformer'
import { CreateVendorLedgerDto } from './dto/create-vendor-ledger.dto'
import { VendorModel } from 'src/vendor/entity/vendor.entity'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'

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
    const repository = this.getRepository(qr)

    // 매입처 관련 프로퍼티만 걸러낸 뒤 저장
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateVendorLedgerDto, row, {
        excludeExtraneousValues: true // @Expose 가 필요함
      })
    )

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto)
      return entity
    })

    // 매입처 저장
    const ledger = await repository.upsert(entityData, {
      conflictPaths: ['vl_row_id'],
      skipUpdateIfNoValuesChanged: true
    })

    if (ledger.identifiers.length === 0)
      throw new BadRequestException('매입처 원장 저장에 실패하였습니다.')

    return ledger
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
