import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MarkStatusModel } from './entity/mark-status.entity'
import { QueryRunner, Repository } from 'typeorm'
import { MarkClientService } from 'src/mark-client/mark-client.service'
import { CreateMarkStatusDto } from './dto/create-mark-status.entity'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class MarkStatusService {
  constructor(
    @InjectRepository(MarkStatusModel)
    private readonly markStatusRepo: Repository<MarkStatusModel>,

    private readonly markClientService: MarkClientService
  ) {}

  async getMarkStatusById(id: number) {
    const markClient = await this.markClientService.getOneMarkClientById(id)

    const result = await this.markStatusRepo.find({
      where: { mark_client: markClient.name },
      order: { id: 'ASC' }
    })
    return result
  }

  async getOneMarkStatusByName(name: string) {
    const result = await this.markStatusRepo.findOne({
      where: { mark_client: name }
    })
    return result
  }

  async createMarkStatus(data: CreateMarkStatusDto[], qr?: QueryRunner) {
    const repository = this.getRepository(qr)
    const instances = data.map((row) => plainToInstance(CreateMarkStatusDto, row))

    try {
      const result = await repository.save(instances)
      return result
    } catch (error) {
      throw new BadRequestException(`Failed to create/update mark_status: ${error.message}`)
    }
  }

  private getRepository(qr?: QueryRunner): Repository<MarkStatusModel> {
    return qr ? qr.manager.getRepository<MarkStatusModel>(MarkStatusModel) : this.markStatusRepo
  }
}
