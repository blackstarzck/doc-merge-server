import { BadRequestException, Injectable } from "@nestjs/common";
import { In, QueryRunner, Repository } from "typeorm";
import { ServiceDeliveryModel } from "./entity/service-delivery.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateServiceDeliveryDto } from "./dto/create-service-delivery.dto";
import { asapScheduler } from "rxjs";

@Injectable()
export class ServiceDeliveryService {
  constructor(
    @InjectRepository(ServiceDeliveryModel)
    private readonly serviceDeliveryRepository: Repository<ServiceDeliveryModel>,
  ) {}

  async getServiceDelivery() {
    return await this.serviceDeliveryRepository.find({
      order: { id: "ASC" },
    });
  }

  async postServiceDelivery(data: ServiceDeliveryModel[], qr?: QueryRunner) {
    const repository = this.getRepository(qr);
    const dtoInstances = data.map((row) => plainToInstance(CreateServiceDeliveryDto, row));

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

  private getRepository(qr?: QueryRunner): Repository<ServiceDeliveryModel> {
    return qr ? qr.manager.getRepository<ServiceDeliveryModel>(ServiceDeliveryModel) : this.serviceDeliveryRepository;
  }

  async deleteServiceDelivery(ids: number[], qr?: QueryRunner) {
    const respository = this.getRepository(qr);
    await respository.delete(ids);
    return await respository.find();
  }
}
