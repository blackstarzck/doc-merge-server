import { OrganizationService } from 'src/organization/organization.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import * as XLSX from 'xlsx'
import { TABLE_COLUMNS } from 'src/common/constants.ts/table.const'
import { removeAllSpaces } from 'src/common/utils/remove-spaces.utils'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { BaseEntity, FindOptionsWhere, QueryRunner, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateBookDeliveryDto } from 'src/book-delivery/dto/create-book-delivery.dto'
import { plainToInstance } from 'class-transformer'
import { CreateServiceDeliveryDto } from 'src/service-delivery/dto/create-service-delivery.dto'
import { ServiceDeliveryModel } from 'src/service-delivery/entity/service-delivery.entity'
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
import { ClientService } from 'src/client/client.service'
import { VendorService } from 'src/vendor/vendor.service'
import { ClientLedgerService } from 'src/client-ledger/client-ledger.service'
import { VendorLedgerService } from 'src/vendor-ledger/vendor-ledger.service'
import { BookDeliveryService } from 'src/book-delivery/book-delivery.service'

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
    private readonly clientLedgerService: ClientLedgerService,
    private readonly vendorService: VendorService,
    private readonly vendorLedgerService: VendorLedgerService,
    private readonly bookDeliveryService: BookDeliveryService
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
    id: any,
    qr?: QueryRunner
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

  async postOverViewUpload(file: Express.Multer.File, overviewId: any, qr?: QueryRunner) {
    const clients = await this.clientService.getClients()
    const vendors = await this.vendorService.getVendors()
    const { dto, repository, prevData } = await this.setBaseData('overview', overviewId, qr)
    const { jsonDataRaw, sheetName } = this.excelProcess(file, 'overview') // 엑셀파일 json 데이터로 변환
    const columns = TABLE_COLUMNS.find((item) => item.name === overviewId)?.columns
    let jsonData = this.matchColumnNames(jsonDataRaw, columns)

    // console.log('jsonData: ', jsonData)

    if (overviewId === 'book_delivery') {
      const bdClCommon = [
        { name: '상위사업자', key: 'client' },
        { name: '발주일자', key: 'cl_order_date' },
        { name: '도서공급단가', key: 'cl_bk_supply_price' },
        { name: '자사이익금', key: 'cl_our_revenue' },
        { name: '자사이익율', key: 'cl_our_revenue_rate' },
        { name: '도서정가', key: 'cl_bk_price' },
        { name: '선금일자', key: 'cl_pre_payment_date' },
        { name: '도서공급율', key: 'cl_bk_supply_rate' },
        { name: '총입금액', key: 'cl_total_payment' }
      ]
      const bdVlCommon = [
        { name: '외주업체', key: 'vendor' },
        { name: '발주일자', key: 'vl_order_date' },
        { name: '도서공급단가', key: 'vl_bk_supply_price' },
        { name: '자사이익금', key: 'vl_our_revenue' },
        { name: '자사이익율', key: 'vl_our_revenue_rate' },
        { name: '기초금액', key: 'vl_base_price' },
        { name: '계산서발행일', key: 'vl_invoice_date' }
      ]
      const clData = this.matchColumnNames(jsonDataRaw, bdClCommon).map((data) => {
        return {
          ...data,
          client_id: data.client ? clients.find((client) => client.name === data.client)?.id : null
        }
      })
      const vlData = this.matchColumnNames(jsonDataRaw, bdVlCommon).map((data) => {
        return {
          ...data,
          vendor_id: data.vendor ? vendors.find((vendor) => vendor.name === data.vendor)?.id : null
        }
      })

      const newJsonData: BookDeliveryModel[] = []

      for (let i = 0; i < jsonData.length; i++) {
        const data = jsonData[i]
        if (data.parent_company && !data.parent_company_id) {
          data.parent_company_id = clData[i].client_id
        }
        if (data.outsourcing_company && !data.outsourcing_company_id) {
          data.outsourcing_company_id = vlData[i].vendor_id
        }
        if (clData[i].client) {
          const clientLedger = await this.clientLedgerService.createClientLedger(clData[i], qr)
          data.client_ledger = clientLedger
        }
        if (vlData[i].vendor) {
          const vendorLedger = await this.vendorLedgerService.createVendorLedger(vlData[i], qr)
          data.vendor_ledger = vendorLedger
        }
        newJsonData.push(data)
      }

      jsonData = newJsonData
    }

    const dtoInstances = jsonData.map((row) => plainToInstance(dto, row))

    // 유효성 검사
    await this.initValidation(dtoInstances)

    const entityData = dtoInstances.map((dto) => repository.create(dto))

    try {
      const upsert = await repository.upsert(entityData, ['no'])
      const result = await repository.find({ order: { id: 'ASC' } })
      return [...prevData, ...result]
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async postOrganizationUpload(file: Express.Multer.File, organizationId: any) {
    const { dto, repository, prevData } = await this.setBaseData('organization', organizationId)
    const { jsonDataRaw, sheetName } = this.excelProcess(file, 'organization') // 엑셀파일 json 데이터로 변환
    const columns = TABLE_COLUMNS.find((item) => item.name === organizationId)?.columns
    let jsonData = this.matchColumnNames(jsonDataRaw, columns)

    // console.log('jsonData: ', jsonData)

    const organization: {
      sheet_data_num: number | null
      sheet_name: string | null
    } = { sheet_data_num: null, sheet_name: null }
    const org = await this.organizationService.getOrganizationNameById(organizationId)

    if (sheetName !== org.name)
      throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${org.name}`)

    organization.sheet_name = org.name
    organization.sheet_data_num = org.id

    jsonData = jsonData.map((data) => ({ ...data, ...organization }))

    const dtoInstances = jsonData.map((row) => plainToInstance(dto, row))

    // 유효성 검사
    await this.initValidation(dtoInstances)

    const entityData = dtoInstances.map((dto) => repository.create(dto))

    // console.log('entityData: ', entityData);

    try {
      const result = await repository.save(entityData)
      return [...prevData, ...result]
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async postClientLedgerUpload(file: Express.Multer.File, clientId: any, qr: QueryRunner) {
    const { jsonDataRaw, sheetName } = this.excelProcess(file, 'client_ledger') // 엑셀파일 json 데이터로 변환
    const columns = TABLE_COLUMNS.find((item) => item.name === 'client_ledger')?.columns
    const jsonData = this.matchColumnNames(jsonDataRaw, columns)

    // console.log('jsonData: ', jsonData)

    const client = await this.clientService.getOneClientById(clientId)

    if (sheetName !== client.name)
      throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${client.name}`)

    for (let i = 0; i < jsonData.length; i++) {
      let data = jsonData[i]
      data = {
        ...data,
        client: client.name,
        client_id: client.id
      }
      const clientLedger = await this.clientLedgerService.createClientLedger(data, qr)
      jsonData[i] = clientLedger
    }
    const result = await this.clientLedgerService.getClientLedgerById(clientId)
    return result
  }

  async postVendorLedgerUpload(file: Express.Multer.File, vendorId: any, qr: QueryRunner) {
    const { jsonDataRaw, sheetName } = this.excelProcess(file, 'vendor_ledger') // 엑셀파일 json 데이터로 변환
    const columns = TABLE_COLUMNS.find((item) => item.name === 'vendor_ledger')?.columns
    const jsonData = this.matchColumnNames(jsonDataRaw, columns)

    // console.log('jsonData: ', jsonData)

    const vendor = await this.vendorService.getOneVendorById(vendorId)

    if (sheetName !== vendor.name)
      throw new BadRequestException(`시트명이 일치하지 않습니다. ${sheetName} != ${vendor.name}`)

    for (let i = 0; i < jsonData.length; i++) {
      let data = jsonData[i]
      data = {
        ...data,
        vendor: vendor.name,
        vendor_id: vendor.id
      }
      const vendorLedger = await this.vendorLedgerService.createVendorLedger(data, qr)
      jsonData[i] = vendorLedger
    }
    const result = await this.vendorLedgerService.getVendorLedgerById(vendorId)
    return result
  }

  private async initValidation(dtoInstances) {
    // 유효성 검사
    const validationErrors: any[] = []
    for (const instance of dtoInstances) {
      const errors = await validate(instance, {
        skipMissingProperties: true,
        whitelist: true,
        forbidNonWhitelisted: true
      })
      if (errors.length > 0) {
        const result = errors.map((error) => {
          return { ...error.constraints }
        })
        validationErrors.push(result)
      }
    }
    console.log('validationErrors: ', validationErrors)

    if (validationErrors.length > 0) throw new BadRequestException(validationErrors)
  }

  excelProcess = (file: Express.Multer.File, path: string) => {
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
    // 공백 문자열 제거
    const cleanedData = jsonDataRaw.map((row) => {
      const cleanedRow = {}
      for (const [key, value] of Object.entries(row)) {
        // 문자열이고 공백만 포함된 경우 빈 문자열로 변환
        cleanedRow[key] = typeof value === 'string' && value.trim() === '' ? '' : value
      }
      return cleanedRow
    })
    if (path === 'client_ledger') cleanedData.pop()
    return { jsonDataRaw: cleanedData, sheetName }
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

  private getRepository(path: string, id: any, qr?: QueryRunner): Repository<Model[]> {
    const repoMap = {
      overview: {
        book_delivery: qr ? qr.manager.getRepository(BookDeliveryModel) : this.bookDeliveryRepo,
        service_delivery: qr
          ? qr.manager.getRepository(ServiceDeliveryModel)
          : this.serviceDeliveryRepo,
        book_disposal: qr ? qr.manager.getRepository(BookDisposalModel) : this.bookDisposalRepo,
        logistics_job: qr ? qr.manager.getRepository(LogisticsJobModel) : this.logisticsJobRepo,
        cargo_usage: qr ? qr.manager.getRepository(CargoUsageModel) : this.cargoUseRepo
      },
      organization: qr ? qr.manager.getRepository(OrganizationModel) : this.organizationRepo,
      vendor_ledger: qr ? qr.manager.getRepository(VendorLedgerModel) : this.vendorLedgerRepo,
      client_ledger: qr ? qr.manager.getRepository(ClientLedgerModel) : this.clientLedgerRepo
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
