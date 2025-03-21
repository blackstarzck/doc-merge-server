import { Expose, Transform } from 'class-transformer'
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformNumber,
  transformIntegerOrNull,
  transformString
} from 'src/common/utils/transform.utils'

export class CreateVendorLedgerDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @Transform(transformString)
  outsourcing_company: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  outsourcing_company_id?: number

  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @IsString()
  author: string

  @IsString()
  processing_company: string

  @IsString()
  order_item: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  base_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  bid_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  purchase_price: number

  @IsNumber()
  @Transform(transformNumber)
  purchase_rate: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  profit: number

  @IsNumber()
  @Transform(transformNumber)
  profit_rate: number

  @IsString()
  status: string

  @IsDate()
  @Transform(transformDate)
  collection_date: Date

  @IsDate()
  @Transform(transformDate)
  remittance_date: Date

  @IsString()
  @Transform(transformDate)
  invoice_received_date: Date

  @IsString()
  @Transform(transformString)
  invoice_recipient: string

  @IsString()
  account_info: string

  @IsString()
  manager: string

  @IsString()
  manager_phone: string
}
