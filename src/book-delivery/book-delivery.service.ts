import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import { BookDeliveryModel } from "./entity/book-delivery.entity";
import { plainToInstance } from "class-transformer";
import { CreateBookDeliveryDto } from "./dto/create-book-delivery.dto";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class BookDeliveryService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepository: Repository<BookDeliveryModel>,
  ) {}

  async getBookDelivery() {
    return await this.bookDeliveryRepository.find({
      order: { id: "ASC" },
    });
  }

  async postBookDelivery(data: BookDeliveryModel[], qr?: QueryRunner) {
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) => plainToInstance(CreateBookDeliveryDto, row));

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

  getRepository(qr?: QueryRunner): Repository<BookDeliveryModel> {
    return qr ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel) : this.bookDeliveryRepository;
  }

  async deleteBookDelivery(ids: number[], qr?: QueryRunner) {
    const repository = this.getRepository(qr);
    await repository.delete(ids);
    return await repository.find();
  }
}
