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
  @Expose()
  id?: number

  @IsString()
  @Transform(transformString)
  @Expose()
  outsourcing_company: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Expose()
  outsourcing_company_id?: number

  @IsDate()
  @Transform(transformDate)
  @Expose()
  order_date: Date

  @IsString()
  @Expose()
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
  @Expose()
  purchase_rate: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Expose()
  profit: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  profit_rate: number

  @IsString()
  @Expose()
  status: string

  @IsDate()
  @Transform(transformDate)
  @Expose()
  collection_date: Date

  @IsDate()
  @Transform(transformDate)
  @Expose()
  remittance_date: Date

  @IsString()
  @Expose()
  invoice: string

  @IsString()
  @Transform(transformString)
  @Expose()
  invoice_recipient: string

  @IsString()
  @Expose()
  account_info: string

  @IsString()
  manager: string

  @IsString()
  @Expose()
  manager_phone: string
}
