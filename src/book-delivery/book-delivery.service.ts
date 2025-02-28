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

    // 유효성 검사 수행
    // this.validate(dtoInstances);

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

  private async validate(dtoInstances) {
    const messages = [];
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        console.error('Validation Errors:', errors); // 문제된 프로퍼티 출력
        return new BadRequestException(errors);
      },
    });

    for (const dto of dtoInstances) {
      await validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateBookDeliveryDto,
      });
    }
  }
}
