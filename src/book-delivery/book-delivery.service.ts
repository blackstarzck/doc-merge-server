import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { BookDeliveryModel } from './entity/book-delivery.entity';
import { plainToInstance } from 'class-transformer';
import { CreateBookDeliveryDto } from './dto/create-book-delivery.dto';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class BookDeliveryService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepository: Repository<BookDeliveryModel>,
  ) {}

  async getBookDelivery() {
    return await this.bookDeliveryRepository.find();
  }

  async postBookDelivery(data: BookDeliveryModel[], qr?: QueryRunner) {
    const result: {
      data: BookDeliveryModel[] | [];
      error: ValidationError[] | null;
    } = {
      data: [],
      error: null,
    };
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateBookDeliveryDto, row),
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

    console.log('SAVED DATA: ', result.data);
    return result;
  }

  getRepository(qr?: QueryRunner): Repository<BookDeliveryModel> {
    return qr
      ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
      : this.bookDeliveryRepository;
  }

  async deleteBookDelivery(ids: number[]) {
    return await this.bookDeliveryRepository.delete(ids);
  }
}
