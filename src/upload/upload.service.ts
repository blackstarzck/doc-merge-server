import { Injectable } from '@nestjs/common';
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
import { validate, ValidationError } from 'class-validator';
import { DocumentTypesEN } from './types/types';

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

  async postUpload(
    file: Express.Multer.File,
    documentId: DocumentTypesEN,
    qr: QueryRunner,
  ) {
    console.log('documentId: ', documentId);

    const savedData = {
      book_delivery: { data: [], error: null },
      service_delivery: { data: [], error: null },
      book_disposal: { data: [], error: null },
      logistics_job: { data: [], error: null },
      cargo_usage: { data: [], error: null },
    };

    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const filteredSheets: any[] = sheetNames.filter((name) => {
      const find = OVERVIEW_TABLES.find((item) => item.name === documentId);
      console.log('Find: ', find);
      return find?.label === name;
    });

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
        raw: false, // 날짜를 시리얼 번호 대신 포맷된 값으로 읽음
        dateNF: 'yyyy-mm-dd', // 원하는 날짜 형식 지정 → 프론트에서 규칙으로 정해야함!
      });
      const jsonData = this.matchColumnNames(jsonDataRaw, columns);

      console.log('jsonData: ', jsonData[0]);

      const dtoInstances = jsonData.map((row) => plainToInstance(dto, row));

      console.log('dtoInstances: ', dtoInstances[0]);

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

      if (validationErrors.length > 0) {
        savedData[name].error = validationErrors;
        continue;
      }

      const entityData = dtoInstances.map((dto) => {
        const entity = repository.create(dto);
        return entity;
      });

      console.log('entityData: ', entityData);

      savedData[name].data = await repository.save(entityData);
    }

    return savedData;
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
