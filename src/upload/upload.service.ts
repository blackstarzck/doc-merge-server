import {
  BadRequestException,
  Injectable,
  ValidationPipe,
} from '@nestjs/common';
import * as XLSX from 'xlsx';
import { OVERVIEW_TABLES } from 'src/common/constants.ts/table.const';
import { removeAllSpaces } from 'src/common/utils/remove-spaces.utils';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDeliveryDto } from 'src/book-delivery/dto/create-book-delivery.dto';
import { plainToInstance } from 'class-transformer';
import { CreateServiceDeliveryDto } from 'src/service-delivery/dto/create-service-delivery.dto';
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity';
import { QueryRunner } from 'typeorm';
import { BookDisposalModel } from 'src/book-disposal/entity/book-disposal.entity';
import { CreateBookDisposalDto } from 'src/book-disposal/dto/create-book-disposal.dto';
import { CargoUseModel } from 'src/cargo-use/entity/cargo-use.entity';
import { CreateCargoUseDto } from 'src/cargo-use/dto/create-cargo-use.dto';
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity';
import { CreaeteLogisticsJobDto } from 'src/logistics-job/dto/create-logistics-job';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepo: Repository<BookDeliveryModel>,

    @InjectRepository(BookDisposalModel)
    private readonly bookDisposalRepo: Repository<BookDisposalModel>,

    @InjectRepository(ServiceDeliveryModel)
    private readonly serviceDeliveryRepo: Repository<ServiceDeliveryModel>,

    @InjectRepository(CargoUseModel)
    private readonly cargoUseRepo: Repository<CargoUseModel>,

    @InjectRepository(LogisticsJobModel)
    private readonly logisticsJobRepo: Repository<LogisticsJobModel>,
  ) {}

  async postUpload(file: Express.Multer.File, qr: QueryRunner) {
    const savedData = {
      book_delivery: [],
      service_delivery: [],
      book_disposal: [],
      logistics_job: [],
      cargo_usage: [],
    };

    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const filteredSheets: any[] = sheetNames.filter(
      (name) =>
        // OVERVIEW_TABLES.find((item) => item.name === name),
        // 테스트 삼아 "도서납품현황", name 으로 바꿔야함
        name === '물류알바(대구, 창원, 대전)',
    );

    for (const sheetName of filteredSheets) {
      const match = OVERVIEW_TABLES.find((item) => item.label === sheetName);

      if (!match) continue; // 다음 시트로
      const dto = this.getDto(match.name);
      const worksheet = workbook.Sheets[sheetName];
      const columns = match.columns;
      const name = match.name;
      const repository = this.getRepository(name, qr);
      const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, {
        defval: '',
      });
      const jsonData = this.matchColumnNames(jsonDataRaw, columns);
      const dtoInstances = jsonData.map((row) => plainToInstance(dto, row));

      // 유효성 검사 수행
      // this.validate(dto, dtoInstances);

      const entityData = dtoInstances.map((dto) => {
        const entity = repository.create(dto);
        return entity;
      });

      savedData[name] = await repository.save(entityData);
    }

    return savedData;
  }

  private async validate(receivedDto, dtoInstances) {
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
        metatype: receivedDto,
      });
    }
  }

  private getDto(name: string) {
    const dtoMap = {
      book_delivery: {
        dto: CreateBookDeliveryDto,
      },
      service_delivery: {
        dto: CreateServiceDeliveryDto,
      },
      book_disposal: {
        dto: CreateBookDisposalDto,
      },
      logistics_job: {
        dto: CreaeteLogisticsJobDto,
      },
      cargo_usage: {
        dto: CreateCargoUseDto,
      },
    };
    return dtoMap[name].dto;
  }

  private getRepository(name: string, qr?: QueryRunner): Repository<any> {
    switch (name) {
      case 'book_delivery':
        return qr
          ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
          : this.bookDeliveryRepo;
      case 'service_delivery':
        return qr
          ? qr.manager.getRepository<ServiceDeliveryModel>(ServiceDeliveryModel)
          : this.serviceDeliveryRepo;
      case 'book_disposal':
        return qr
          ? qr.manager.getRepository<BookDisposalModel>(BookDisposalModel)
          : this.bookDisposalRepo;
      case 'logistics_job':
        return qr
          ? qr.manager.getRepository<LogisticsJobModel>(LogisticsJobModel)
          : this.logisticsJobRepo;
      case 'cargo_usage':
        return qr
          ? qr.manager.getRepository<CargoUseModel>(CargoUseModel)
          : this.cargoUseRepo;
      default:
        return this.bookDeliveryRepo;
    }
  }

  private matchColumnNames(raw, columns) {
    return raw.map((row) =>
      Object.keys(row).reduce(
        (acc, key) => {
          const cleanedKey = removeAllSpaces(key); // 공백, 줄바꿈, 탭 제거

          // 매핑 배열에서 key를 찾아서 대응하는 영문 key로 변경
          const mappedColumn = columns.find((col) => col.name === cleanedKey);

          // 매핑된 컬럼이 있는 경우만 포함 (없으면 무시)
          if (mappedColumn) {
            acc[mappedColumn.key] = row[key] ?? null; // 값이 없을 경우 null 처리
          }

          return acc;
        },
        {} as Record<string, any>,
      ),
    );
  }
}
