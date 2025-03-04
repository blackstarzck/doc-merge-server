import { Injectable } from '@nestjs/common';
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
    private readonly bookDisposalRepository: Repository<BookDisposalModel>,
  ) {}

  async getBookDisposal() {
    return await this.bookDisposalRepository.find();
  }

  async postBookDisposal(data: BookDisposalModel[], qr?: QueryRunner) {
    const result: {
      data: BookDisposalModel[] | [];
      error: ValidationError[] | null;
    } = {
      data: [],
      error: null,
    };
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateBookDisposalDto, row),
    );

    // 유효성 검사
    const validationErrors: ValidationError[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        validationErrors.push(...errors);
      }
    }

    console.log('validationErrors: ', validationErrors);

    if (validationErrors.length > 0) {
      result.error = validationErrors;
    }

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    console.log('entityData: ', entityData);

    result.data = await repository.save(entityData);
    return result;
  }

  getRepository(qr?: QueryRunner): Repository<BookDisposalModel> {
    return qr
      ? qr.manager.getRepository<BookDisposalModel>(BookDisposalModel)
      : this.bookDisposalRepository;
  }
}
