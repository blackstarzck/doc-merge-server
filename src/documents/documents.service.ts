import { Injectable } from '@nestjs/common';
import { DocumentsModel } from './entity/documents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import * as XLSX from 'xlsx';
import { mappedColumns } from '../common/columnMap';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentsModel)
    private readonly documentRepository: Repository<DocumentsModel>,
  ) {}

  async getDocuments() {
    const documents = await this.documentRepository.find();

    console.log('documents: ', documents);

    return documents;
  }

  async createDocument(dto: CreateDocumentDto) {
    console.log('dt: ', dto);
    const document = this.documentRepository.create(dto);

    return await this.documentRepository.save(document);
  }

  async processExcel(file: Express.Multer.File) {
    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 선택
    const worksheet = workbook.Sheets[sheetName];

    console.log('sheetNames: ', workbook.SheetNames);

    // 2️⃣ 엑셀 데이터를 JSON으로 변환 (타입 지정)
    const jsonDataRaw: any[] = XLSX.utils.sheet_to_json<any>(worksheet, {
      defval: '',
    });

    // 3️⃣ 컬럼명 및 데이터에서 공백과 줄바꿈 문자 제거
    const jsonData = jsonDataRaw.map((row) =>
      Object.keys(row).reduce(
        (acc, key) => {
          const cleanedKey = key.replace(/[\s\r\n\t]/g, ''); // 공백, 줄바꿈, 탭 제거

          // 매핑 배열에서 key를 찾아서 대응하는 영문 key로 변경
          const mappedColumn = mappedColumns.find(
            (col) => col.name === cleanedKey,
          );
          const newKey = mappedColumn ? mappedColumn.key : cleanedKey; // 매핑된 key가 있으면 그걸 사용, 없으면 기존 key 사용

          acc[newKey] = row[key];
          return acc;
        },
        {} as Record<string, any>,
      ),
    );

    console.log('jsonData: ', jsonData);

    const dtoInstances = jsonData.map((row) =>
      plainToInstance(CreateDocumentDto, row),
    );

    console.log('dtoInstances: ', dtoInstances);

    // 5️⃣ DTO → 엔티티 변환
    const entityData = dtoInstances.map((dto) => {
      return this.documentRepository.create({
        ...dto,
        sheet_data_num: 1,
        sheet_name: '여송사회복지재단(위즈덤샐러)',
      });
    });

    console.log('entityData: ', entityData);

    // 6️⃣ 데이터베이스 저장 (존재하면 업데이트, 없으면 삽입)
    const savedData = await this.documentRepository.save(entityData);
    console.log('savedData: ', savedData);

    return savedData;
  }
}
