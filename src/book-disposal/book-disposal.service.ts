import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDisposalModel } from './entity/book-disposal.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateBookDisposalDto } from './dto/create-book-disposal.dto';

@Injectable()
export class BookDisposalService {
  constructor(
    @InjectRepository(BookDisposalModel)
    private readonly bookDisposalRepository: Repository<BookDisposalModel>
  ) {}

  async getBookDisposal() {
    return await this.bookDisposalRepository.find({
      order: { id: 'ASC' },
    });
  }

  async postBookDisposal(data: BookDisposalModel[], qr?: QueryRunner) {
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) => plainToInstance(CreateBookDisposalDto, row));

    // 유효성 검사
    const validationErrors: any[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints };
        });
        validationErrors.push(result);
      }
    }

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors);

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    return await repository.save(entityData);
  }

  getRepository(qr?: QueryRunner): Repository<BookDisposalModel> {
    return qr ? qr.manager.getRepository<BookDisposalModel>(BookDisposalModel) : this.bookDisposalRepository;
  }

  async deleteBookDisposal(ids: number[], qr: QueryRunner) {
    const repository = this.getRepository(qr);
    await repository.delete(ids);
    return await repository.find();
  }
}
