import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
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
    console.log('data: ', data);
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) =>
      plainToInstance(CreateBookDeliveryDto, row),
    );

    // 유효성 검사
    const validationErrors: ValidationError[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true, // @IsOptional()과 호환
        whitelist: true, // 정의되지 않은 속성 무시
        forbidNonWhitelisted: true, // 정의되지 않은 속성 에러
      });
      if (errors.length > 0) {
        validationErrors.push(...errors);
      }
    }

    console.log('validationErrors: ', validationErrors);

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });
    const saved = await repository.save(entityData);
    return saved;
  }

  getRepository(qr?: QueryRunner): Repository<BookDeliveryModel> {
    return qr
      ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
      : this.bookDeliveryRepository;
  }
}
