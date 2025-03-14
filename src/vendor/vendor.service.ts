import { BadRequestException, Injectable } from '@nestjs/common'
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

  async createVendor(dto: CreateVendorDto) {
    const nameExists = await this.vendorRepo.exists({ where: { name: dto.name } })

    if (nameExists) throw new BadRequestException('이미 가입한 거래처명입니다.')

    const instance = plainToInstance(CreateVendorDto, dto)
    const entity = this.vendorRepo.create(instance)

    return await this.vendorRepo.save(entity)
  }
}
