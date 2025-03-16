import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MarkClientModel } from './entity/mark-client.entity'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { CreateMarkClientDto } from './dto/create-mark-client.dto'

@Injectable()
export class MarkClientService {
  constructor(
    @InjectRepository(MarkClientModel)
    private readonly markClientRepo: Repository<MarkClientModel>
  ) {}

  async getMarkClients() {
    return await this.markClientRepo.find({ order: { id: 'ASC' } })
  }

  async getMarkClientById(clientId: number) {
    return await this.markClientRepo.findBy({ id: clientId })
  }

  async createMarkClient(dto: CreateMarkClientDto) {
    const nameExists = await this.markClientRepo.exists({ where: { name: dto.name } })
    if (nameExists) throw new BadRequestException('이미 가입한 거래처명입니다.')

    const instance = plainToInstance(CreateMarkClientDto, dto)
    const entity = this.markClientRepo.create(instance)

    return await this.markClientRepo.save(entity)
  }

  async updateMarkClient(clientId: number, dto: CreateMarkClientDto) {
    const nameExists = await this.markClientRepo.exists({ where: { id: clientId } })
    if (!nameExists) throw new BadRequestException('거래처가 존재하지 않습니다.')

    const instance = plainToInstance(CreateMarkClientDto, dto)
    const entity = this.markClientRepo.create(instance)
    const update = await this.markClientRepo.update(clientId, { ...entity })

    if (update.affected === 0) throw new BadRequestException('거래처 정보를 수정할 수 없습니다.')
    const find = await this.markClientRepo.findOne({ where: { id: clientId } })
    return find
  }
}
