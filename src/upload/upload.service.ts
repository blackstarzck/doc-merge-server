import { BadRequestException, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import {
  ORGANIZATION_COLUMNS,
  OVERVIEW_TABLES,
} from 'src/common/constants.ts/table.const';
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
import { CargoUsageModel } from 'src/cargo-use/entity/cargo-usage.entity';
import { CreateCargoUseDto } from 'src/cargo-use/dto/create-cargo-usage.dto';
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity';
import { CreaeteLogisticsJobDto } from 'src/logistics-job/dto/create-logistics-job';
import { validate, ValidationError } from 'class-validator';
import { DocumentTypesEN } from './types/types';
import { OrganizationModel } from 'src/organizations/entity/organizations.entity';
import { CreateOrganizationDto } from 'src/organizations/dto/create-organization.dto';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepo: Repository<BookDeliveryModel>,

    @InjectRepository(BookDisposalModel)
    private readonly bookDisposalRepo: Repository<BookDisposalModel>,

    @InjectRepository(ServiceDeliveryModel)
    private readonly serviceDeliveryRepo: Repository<ServiceDeliveryModel>,

    @InjectRepository(CargoUsageModel)
    private readonly cargoUseRepo: Repository<CargoUsageModel>,

    @InjectRepository(LogisticsJobModel)
    private readonly logisticsJobRepo: Repository<LogisticsJobModel>,

    @InjectRepository(OrganizationModel)
    private readonly organizationRepo: Repository<OrganizationModel>,
  ) {}

  async postUpload(
    file: Express.Multer.File,
    documentId: DocumentTypesEN,
    qr: QueryRunner,
  ) {
    const result: { data: any[]; error: ValidationError[] | null } = {
      data: [],
      error: null,
    };

    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const dto = this.getDto(documentId);
    const worksheet = workbook.Sheets[sheetName];
    const match = OVERVIEW_TABLES.find((item) => item.name === documentId);
    const columns = match ? match.columns : ORGANIZATION_COLUMNS;
    const repository = this.getRepository(documentId, qr);
    const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, {
      defval: '',
      raw: false, // 날짜를 시리얼 번호 대신 포맷된 값으로 읽음
      dateNF: 'yyyy-mm-dd', // 원하는 날짜 형식 지정 → 프론트에서 규칙으로 정해야함!
    });
    const jsonData = this.matchColumnNames(jsonDataRaw, columns);
    console.log('jsonData: ', jsonData[0]);
    const dtoInstances = jsonData.map((row) =>
      plainToInstance(dto as any, row),
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

    // console.log('validationErrors: ', validationErrors);

    if (validationErrors.length > 0) {
      result.error = validationErrors;
    }

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    // console.log('entityData: ', entityData);

    result.data = await repository.save(entityData);

    return result;
  }

  private getDto(type: DocumentTypesEN) {
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
    return typeof type === 'number' ? CreateOrganizationDto : dtoMap[type].dto;
  }

  private getRepository(
    name: DocumentTypesEN,
    qr?: QueryRunner,
  ): Repository<any> {
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
          ? qr.manager.getRepository<CargoUsageModel>(CargoUsageModel)
          : this.cargoUseRepo;
      default:
        return qr
          ? qr.manager.getRepository<OrganizationModel>(OrganizationModel)
          : this.organizationRepo;
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
