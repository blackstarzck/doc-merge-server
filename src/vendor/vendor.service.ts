import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VendorModel } from './entity/vendor.entity'
import { CreateVendorDto } from './dto/create-vendor.dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(VendorModel)
    private readonly vendorRepo: Repository<VendorModel>
  ) {}

  async getVendors() {
    return await this.vendorRepo.find()
  }

  async getVendorById(clientId: number) {
    return await this.vendorRepo.findBy({ id: clientId })
  }

  async getOneVendorById(vendorId: number) {
    const result = await this.vendorRepo.findOne({ where: { id: vendorId } })
    if (!result) throw new NotFoundException(`매입처( ${vendorId}) 정보를 찾지 못했습니다.`)
    return result
  }

  async createVendor(dto: CreateVendorDto) {
    const nameExists = await this.vendorRepo.exists({ where: { name: dto.name } })
    if (nameExists) throw new BadRequestException('이미 가입한 거래처명입니다.')

    const instance = plainToInstance(CreateVendorDto, dto)
    const entity = this.vendorRepo.create(instance)

    return await this.vendorRepo.save(entity)
  }

  async updateVendor(vendorId: number, dto: CreateVendorDto) {
    const nameExists = await this.vendorRepo.exists({ where: { id: vendorId } })
    if (!nameExists) throw new BadRequestException('거래처가 존재하지 않습니다.')

    const instance = plainToInstance(CreateVendorDto, dto)
    const entity = this.vendorRepo.create(instance)
    const update = await this.vendorRepo.update(vendorId, { ...entity })

    if (update.affected === 0) throw new BadRequestException('거래처 정보를 수정할 수 없습니다.')
    const find = await this.vendorRepo.findOne({ where: { id: vendorId } })
    return find
  }
}
