import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryRunner, Repository } from 'typeorm'
import { VendorLedgerModel } from './entity/vendor-ledger.entity'
import { plainToInstance } from 'class-transformer'
import { CreateVendorLedgerDto } from './dto/create-vendor-ledger.dto'
import { VendorModel } from 'src/vendor/entity/vendor.entity'

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
      where: { outsourcing_company: vendor.name },
      order: { id: 'ASC' }
    })
  }

  async postVendorLedger(datas: CreateVendorLedgerDto[]) {
    const deleteResult = await this.vendorLedgerRepo.delete({})

    const dtoInstances = datas.map((data) =>
      plainToInstance(CreateVendorLedgerDto, data, {
        excludeExtraneousValues: true // @Expose 가 필요함
      })
    )

    const entityData = dtoInstances.map((dto) => {
      const entity = this.vendorLedgerRepo.create(dto)
      return entity
    })

    const saved = await this.vendorLedgerRepo.save(entityData)
    return saved
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
      where: { outsourcing_company_id: vendorId },
      order: { id: 'ASC' }
    })
    return find
  }
}
