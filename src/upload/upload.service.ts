import { OrganizationService } from 'src/organization/organization.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as XLSX from 'xlsx'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'
import { removeAllSpaces } from 'src/common/utils/remove-spaces.utils'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { BaseEntity, FindOptionsWhere, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBookDeliveryDto } from 'src/book-delivery/dto/create-book-delivery.dto'
import { plainToInstance } from 'class-transformer'
import { CreateServiceDeliveryDto } from 'src/service-delivery/dto/create-service-delivery.dto'
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity'
import { QueryRunner } from 'typeorm'
import { BookDisposalModel } from 'src/book-disposal/entity/book-disposal.entity'
import { CreateBookDisposalDto } from 'src/book-disposal/dto/create-book-disposal.dto'
import { CargoUsageModel } from 'src/cargo-use/entity/cargo-usage.entity'
import { CreateCargoUseDto } from 'src/cargo-use/dto/create-cargo-usage.dto'
import { LogisticsJobModel } from 'src/logistics-job/entity/logistics-job.entity'
import { CreateLogisticsJobDto } from 'src/logistics-job/dto/create-logistics-job.dto'
import { validate } from 'class-validator'
import { CreateOrganizationDto } from 'src/organization/dto/create-organization.dto'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { CreateVendorLedgerDto } from 'src/vendor-ledger/dto/create-vendor-ledger.dto'
import { CreateClientLedgerDto } from 'src/client-ledger/dto/create-client-ledger.dto'
import { OrganizationModel } from 'src/organization/entity/organizations.entity'
import { ClientModel } from 'src/client/entity/client.entity'
import { ClientService } from 'src/client/client.service'
import { VendorService } from 'src/vendor/vendor.service'

type Model =
  | BookDeliveryModel
  | ServiceDeliveryModel
  | BookDisposalModel
  | CargoUsageModel
  | LogisticsJobModel
  | OrganizationModel

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

    @InjectRepository(VendorLedgerModel)
    private readonly vendorLedgerRepo: Repository<VendorLedgerModel>,

    @InjectRepository(ClientLedgerModel)
    private readonly clientLedgerRepo: Repository<ClientLedgerModel>,

    private readonly organizationService: OrganizationService,
    private readonly clientService: ClientService,
    private readonly vendorService: VendorService
  ) {}

  private async getExsistingData<T extends BaseEntity>(
    repository: any,
    path: string,
    id?: number
  ): Promise<T[]> {
    const findOption =
      path === 'organization'
        ? {
            sheet_data_num: id
          }
        : { id }
    const data =
      path === 'overview'
        ? await repository.find()
        : await repository.findBy(findOption as FindOptionsWhere<T>)
    return data
  }

  private async setBaseData(
    path: string,
    qr: QueryRunner,
    id: any
  ): Promise<{
    dto: any
    repository: any
    prevData: BaseEntity[]
  }> {
    const dto = this.getDto(path, id)
    const repository = this.getRepository(path, id, qr)
    const prevData = await this.getExsistingData(repository, path, id) // 기존 데이터 조회
    return { dto, repository, prevData }
  }

  async postUpload(path: string, file: Express.Multer.File, id: any, qr: QueryRunner) {
    const { dto, repository, prevData } = await this.setBaseData(path, qr, id)
    const { jsonDataRaw, sheetName } = this.excelProcess(file) // 엑셀파일 json 데이터로 변환
    const tableName = path === 'overview' ? id : path
    const columns = TABLE_COLUMNS.find((item) => item.name === tableName)?.columns
    let jsonData = this.matchColumnNames(jsonDataRaw, columns)

    console.log('jsonData: ', jsonData)

    if (path === 'organization') {
      const organization: {
        sheet_data_num: number | null
        sheet_name: string | null
      } = { sheet_data_num: null, sheet_name: null }
      const org = await this.organizationService.getOrganizationNameById(id)

      if (sheetName !== org.name)
        throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${org.name}`)

      organization.sheet_name = org.name
      organization.sheet_data_num = org.id

      jsonData = jsonData.map((data) => ({ ...data, ...organization }))
      // 매출처
    } else if (path === 'client_ledger') {
      const client = await this.clientService.getOneClientById(id)

      if (sheetName !== client.name)
        throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${client.name}`)

      jsonData = jsonData.map((data) => ({
        ...data,
        parent_company: client.name,
        parent_company_id: client.id
      }))
    } else if (path === 'vendor_ledger') {
      const vendor = await this.vendorService.getOneVendorById(id)

      if (sheetName !== vendor.name)
        throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${vendor.name}`)

      jsonData = jsonData.map((data) => ({
        ...data,
        outsourcing_company: vendor.name,
        outsourcing_company_id: vendor.id
      }))
    }

    const dtoInstances = jsonData.map((row) => {
      return plainToInstance(dto, row)
    })

    // 유효성 검사
    const validationErrors: any[] = []
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      // console.log('errors: ', errors);
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints }
        })
        validationErrors.push(result)
      }
    }

    console.log('validationErrors: ', validationErrors)

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors)

    const entityData = dtoInstances.map((dto) => {
      const entity = repository.create(dto)
      return entity
    })

    // console.log('entityData: ', entityData);

    const result = await repository.save(entityData)

    return [...prevData, ...result]
  }

  excelProcess = (file: Express.Multer.File) => {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' })
    console.log('sheet names: ', workbook.SheetNames)
    // ↓ 첫번째 시트만 읽음, 만약 여러개의 시트에 대한 입력을 원하실 경우 반복문으로 수정하면됨
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const option = {
      defval: '',
      raw: false, // 날짜를 시리얼 번호 대신 포맷된 값으로 읽음
      dateNF: 'yyyy-mm-dd' // 원하는 날짜 형식 지정 → 프론트에서 규칙으로 정해야함!
    }
    const jsonDataRaw = XLSX.utils.sheet_to_json<any>(worksheet, option)
    return { jsonDataRaw, sheetName }
  }

  private getDto(path: string, id?: any) {
    const dtoMap = {
      overview: {
        book_delivery: CreateBookDeliveryDto,
        service_delivery: CreateServiceDeliveryDto,
        book_disposal: CreateBookDisposalDto,
        logistics_job: CreateLogisticsJobDto,
        cargo_usage: CreateCargoUseDto
      },
      organization: CreateOrganizationDto,
      vendor_ledger: CreateVendorLedgerDto,
      client_ledger: CreateClientLedgerDto
    }
    return path === 'overview' ? dtoMap[path][id] : dtoMap[path]
  }

  private getRepository(path: string, id?: any, qr?: QueryRunner): Repository<Model[]> {
    const repoMap = {
      overview: {
        book_delivery: qr
          ? qr.manager.getRepository<BookDeliveryModel>(BookDeliveryModel)
          : this.bookDeliveryRepo,
        service_delivery: qr
          ? qr.manager.getRepository<ServiceDeliveryModel>(ServiceDeliveryModel)
          : this.serviceDeliveryRepo,
        book_disposal: qr
          ? qr.manager.getRepository<BookDisposalModel>(BookDisposalModel)
          : this.bookDisposalRepo,
        logistics_job: qr
          ? qr.manager.getRepository<LogisticsJobModel>(LogisticsJobModel)
          : this.logisticsJobRepo,
        cargo_usage: qr
          ? qr.manager.getRepository<CargoUsageModel>(CargoUsageModel)
          : this.cargoUseRepo
      },
      organization: qr
        ? qr.manager.getRepository<OrganizationModel>(OrganizationModel)
        : this.organizationRepo,
      vendor_ledger: qr
        ? qr.manager.getRepository<VendorLedgerModel>(VendorLedgerModel)
        : this.vendorLedgerRepo,
      client_ledger: qr
        ? qr.manager.getRepository<ClientLedgerModel>(ClientLedgerModel)
        : this.clientLedgerRepo
    }
    return path === 'overview' ? repoMap.overview[id] : repoMap[path]
  }

  private matchColumnNames(raw, columns) {
    return raw.map((row) =>
      Object.keys(row).reduce(
        (acc, key) => {
          const cleanedKey = removeAllSpaces(key) // 공백, 줄바꿈, 탭 제거

          // 매핑 배열에서 key를 찾아서 대응하는 영문 key로 변경
          const mappedColumn = columns.find((col) => col.name === cleanedKey)

          // 매핑된 컬럼이 있는 경우만 포함 (없으면 무시)
          if (mappedColumn) {
            acc[mappedColumn.key] = row[key] ?? '' // 값이 없을 경우 null 처리
          }

          return acc
        },
        {} as Record<string, any>
      )
    )
  }
}
