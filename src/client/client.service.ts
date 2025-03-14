import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ClientModel } from './entity/client.entity'
import { Repository } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { CreateClientDto } from './dto/create-client.dto'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientModel)
    private readonly clientRepo: Repository<ClientModel>
  ) {}

  async getClients() {
    return await this.clientRepo.find()
  }

  async getClientsById(clientId: number) {
    return await this.clientRepo.findBy({ id: clientId })
  }

  async createClient(dto: CreateClientDto) {
    const nameExists = await this.clientRepo.exists({ where: { name: dto.name } })

    if (nameExists) throw new BadRequestException('이미 가입한 거래처명입니다.')

    const instance = plainToInstance(CreateClientDto, dto)
    const entity = this.clientRepo.create(instance)

    return await this.clientRepo.save(entity)
  }
}
