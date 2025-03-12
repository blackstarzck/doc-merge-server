import { OrganizationsService } from "src/organizations/organizations.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { ORGANIZATION_COLUMNS, OVERVIEW_TABLES } from "src/common/constants.ts/table.const";
import { removeAllSpaces } from "src/common/utils/remove-spaces.utils";
import { BookDeliveryModel } from "src/book-delivery/entity/book-delivery.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBookDeliveryDto } from "src/book-delivery/dto/create-book-delivery.dto";
import { plainToInstance } from "class-transformer";
import { CreateServiceDeliveryDto } from "src/service-delivery/dto/create-service-delivery.dto";
import { ServiceDeliveryModel } from "src/service-delivery/entity/service-delivery.entity";
import { QueryRunner } from "typeorm";
import { BookDisposalModel } from "src/book-disposal/entity/book-disposal.entity";
import { CreateBookDisposalDto } from "src/book-disposal/dto/create-book-disposal.dto";
import { CargoUsageModel } from "src/cargo-use/entity/cargo-usage.entity";
import { CreateCargoUseDto } from "src/cargo-use/dto/create-cargo-usage.dto";
import { LogisticsJobModel } from "src/logistics-job/entity/logistics-job.entity";
import { CreaeteLogisticsJobDto } from "src/logistics-job/dto/create-logistics-job.dto";
import { validate } from "class-validator";
import { DocumentTypesEN } from "./types/types";
import { OrganizationsModel } from "src/organizations/entity/organizations.entity";
import { CreateOrganizationDto } from "src/organizations/dto/create-organization.dto";

type Model = BookDeliveryModel | ServiceDeliveryModel | BookDisposalModel | CargoUsageModel | LogisticsJobModel | OrganizationsModel;

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

    @InjectRepository(OrganizationsModel)
    private readonly organizationRepo: Repository<OrganizationsModel>,

    private readonly organizationsService: OrganizationsService,
  ) {}

  private isOrganization(documentId: string) {
    const isOrg = !OVERVIEW_TABLES.map((table) => table.name).includes(documentId);
    return isOrg;
  }

  private async getExsistingData(repository: Repository<Model>, documentId: string): Promise<Model[]> {
    const isOrg = this.isOrganization(documentId);
    return isOrg ? await repository.findBy({ id: Number(documentId) }) : await repository.find();
  }

  async postUpload(file: Express.Multer.File, documentId: string, qr: QueryRunner) {
    const organization: {
      sheet_data_num: number | null;
      sheet_name: string | null;
    } = { sheet_data_num: null, sheet_name: null };
    const dto = this.getDto(documentId);
    const repository = this.getRepository(documentId, qr);
    const match = OVERVIEW_TABLES.find((item) => item.name === documentId);
    const columns = match ? match.columns : ORGANIZATION_COLUMNS;
    const prevData = await this.getExsistingData(repository, documentId); // 기존 데이터 조회
    const { jsonDataRaw, sheetName } = this.excelProcess(file); // 엑셀파일 json 데이터로 변환
    let jsonData = this.matchColumnNames(jsonDataRaw, columns);

    // console.log('jsonData: ', jsonData);

    if (!match) {
      const org = await this.organizationsService.getOrganizationNameById(Number(documentId));

      if (sheetName !== org.name) throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${org.name}`);

      organization.sheet_name = org.name;
      organization.sheet_data_num = org.id;

      jsonData = jsonData.map((data) => ({ ...data, ...organization }));
    } else {
      if (sheetName !== match.label) throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${match.label}`);
    }

    const dtoInstances = jsonData.map((row) => plainToInstance(dto as any, row));

    // 유효성 검사
    const validationErrors: any[] = [];
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      // console.log('errors: ', errors);
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints };
        });
        validationErrors.push(result);
      }
    }

    // console.log('validationErrors: ', validationErrors);

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors);

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto);
      return entity;
    });

    // console.log('entityData: ', entityData);

    const result = await repository.save(entityData);

    return [...prevData, ...result];
  }

  excelProcess = (file: Express.Multer.File) => {
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    console.log("workbook.SheetNames: ", workbook.SheetNames);
    // ↓ 첫번째 시트만 읽음, 만약 여러개의 시트에 대한 입력을 원하실 경우 반복문으로 수정하면됨
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const option = {
      defval: "",
      raw: false, // 날짜를 시리얼 번호 대신 포맷된 값으로 읽음
      dateNF: "yyyy-mm-dd", // 원하는 날짜 형식 지정 → 프론트에서 규칙으로 정해야함!
    };
    const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, option);
    return { jsonDataRaw, sheetName };
  };

  private getDto(type: DocumentTypesEN) {
    const isOrg = !["book_delivery", "service_delivery", "book_disposal", "logistics_job", "cargo_usage"].includes(type);
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
    return isOrg ? CreateOrganizationDto : dtoMap[type].dto;
  }

  private getRepository(name: DocumentTypesEN, qr?: QueryRunner): Repository<any> {
    switch (name) {
      case "book_delivery":
        return qr ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel) : this.bookDeliveryRepo;
      case "service_delivery":
        return qr ? qr.manager.getRepository<ServiceDeliveryModel>(ServiceDeliveryModel) : this.serviceDeliveryRepo;
      case "book_disposal":
        return qr ? qr.manager.getRepository<BookDisposalModel>(BookDisposalModel) : this.bookDisposalRepo;
      case "logistics_job":
        return qr ? qr.manager.getRepository<LogisticsJobModel>(LogisticsJobModel) : this.logisticsJobRepo;
      case "cargo_usage":
        return qr ? qr.manager.getRepository<CargoUsageModel>(CargoUsageModel) : this.cargoUseRepo;
      default:
        return qr ? qr.manager.getRepository<OrganizationsModel>(OrganizationsModel) : this.organizationRepo;
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
