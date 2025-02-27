import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { OVERVIEW_TABLES } from 'src/constants.ts/constants';
import { removeAllSpaces } from 'src/utils/remove-spaces.utils';
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDeliveryDto } from 'src/book-delivery/dto/create-book-delivery.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepo: Repository<BookDeliveryModel>,
  ) {}

  async postUpload(file: Express.Multer.File) {
    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const overviewSheets = sheetNames
      .filter(
        (name) =>
          // OVERVIEW_TABLES.find((item) => item.label === name),
          // 테스트 삼아 "도서납품현황", name 으로 바꿔야함
          name === '용역, 물품납품',
      )
      .map((name) => {
        const worksheet = workbook.Sheets[name];
        const columns = OVERVIEW_TABLES.find(
          (item) => item.label === name,
        )?.columns;
        const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, {
          defval: '',
        });
        const jsonData = this.matchColumnNames(jsonDataRaw, columns);
        return jsonData;
      });

    overviewSheets.forEach((sheet) => {
      const dtoInstances = sheet.map((row) =>
        plainToInstance(CreateBookDeliveryDto, row),
      );
      const entityData = dtoInstances.map((dto) => {
        const entity = this.bookDeliveryRepo.create(dto);
        return entity;
      });
      this.bookDeliveryRepo.save(entityData);
    });

    console.log('overviewSheets: ', overviewSheets);

    return overviewSheets;
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
