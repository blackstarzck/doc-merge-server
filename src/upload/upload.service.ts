import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { OVERVIEW_TABLES } from 'src/constants.ts/constants';
import { removeAllSpaces } from 'src/utils/remove-spaces.utils';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDeliveryDto } from 'src/book-delivery/dto/create-book-delivery.dto';
import { plainToInstance } from 'class-transformer';
import { CreateServiceDeliveryDto } from 'src/service-delivery/dto/create-service-delivery.dto';
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepo: Repository<BookDeliveryModel>,

    @InjectRepository(ServiceDeliveryModel)
    private readonly serviceDeliveryRepo: Repository<ServiceDeliveryModel>,
  ) {}

  async postUpload(file: Express.Multer.File) {
    const overViewsMap = {
      book_delivery: {
        dto: CreateBookDeliveryDto,
        data: [],
      },
      service_delivery: {
        dto: CreateServiceDeliveryDto,
        data: [],
      },
      book_disposal: {
        dto: null,
        data: [],
      },
      logistics_job: {
        dto: null,
        data: [],
      },
      cargo_usage: {
        dto: null,
        data: [],
      },
    };

    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    sheetNames
      .filter(
        (label) =>
          // OVERVIEW_TABLES.find((item) => item.label === label),
          // 테스트 삼아 "도서납품현황", label 으로 바꿔야함
          label === '용역, 물품납품',
      )
      .forEach((label) => {
        const match = OVERVIEW_TABLES.find((item) => item.label === label);
        if (!match) return;
        const worksheet = workbook.Sheets[label];
        const columns = match.columns;
        const name = match.name;
        const repository = this.getRepository(name);
        const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, {
          defval: '',
        });
        const jsonData = this.matchColumnNames(jsonDataRaw, columns);
        const dtoInstances = jsonData.map((row) =>
          plainToInstance(overViewsMap[name].dto, row),
        );
        const entityData = dtoInstances.map((dto) => {
          const entity = repository.create(dto);
          return entity;
        });
        repository.save(entityData);
      });

    return overViewsMap;
  }

  private getRepository(name: string): Repository<any> {
    switch (name) {
      case 'book_delivery':
        return this.bookDeliveryRepo;
      case 'service_delivery':
        return this.serviceDeliveryRepo;
      case 'book_disposal':
        return this.serviceDeliveryRepo;
      case 'logistics_job':
        return this.serviceDeliveryRepo;
      case 'cargo_usage':
        return this.bookDeliveryRepo;
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
