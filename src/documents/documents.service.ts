import { Injectable } from '@nestjs/common'
import { DocumentModel } from './entity/documents.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDocumentDto } from './dto/create-document.dto'
import * as XLSX from 'xlsx'

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(DocumentModel)
    private readonly documentRepository: Repository<DocumentModel>,
  ) {}

  async getDocuments() {
    const documents = await this.documentRepository.find()

    console.log('documents: ', documents)

    return documents
  }

  async createDocument(dto: CreateDocumentDto) {
    console.log('dt: ', dto)
    const document = this.documentRepository.create(dto)

    return await this.documentRepository.save(document)
  }

  async processExcel(file: Express.Multer.File) {
    // 1️⃣ 파일 버퍼를 엑셀로 변환
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 선택
    const worksheet = workbook.Sheets[sheetName];

    // 2️⃣ 엑셀 데이터를 JSON으로 변환 (타입 지정)
    const jsonDataRaw: any[] = XLSX.utils.sheet_to_json<any>(worksheet, { defval: "" });


    // 3️⃣ 컬럼명 및 데이터에서 공백과 줄바꿈 문자 제거
    const jsonData = jsonDataRaw.map((row) =>
      Object.keys(row).reduce((acc, key) => {
        const cleanedKey = key.replace(/[\s\r\n\t]/g, ""); // 공백, 줄바꿈, 탭 제거
        acc[cleanedKey] = row[key];
        return acc;
      }, {} as Record<string, any>)
    );

    console.log("jsonData: ", jsonData)
    return jsonData;

    // 4️⃣ 데이터베이스 저장
    // await this.dataRepository.saveData(formattedData);
  }
}
