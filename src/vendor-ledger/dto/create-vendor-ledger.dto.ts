import { Expose, Transform } from 'class-transformer'
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
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

  @Expose()
  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @Expose()
  @IsString()
  author: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  contractor: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  vendor: string

  @Expose()
  @IsNotEmpty()
  @IsInt()
  vendor_id: number

  @Expose()
  @IsString()
  order_item: string

  @Expose()
  @IsInt()
  @Transform(transformIntegerOrNull)
  base_price: number

  @Expose()
  @IsInt()
  @Transform(transformIntegerOrNull)
  bk_supply_price: number

  @Expose()
  @IsInt()
  @Transform(transformIntegerOrNull)
  purchase_price: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  purchase_rate: number

  @Expose()
  @IsInt()
  @Transform(transformIntegerOrNull)
  our_revenue: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  our_revenue_rate: number

  @Expose()
  @IsString()
  status: string

  @Expose()
  @IsDate()
  @Transform(transformDate)
  collection_date: Date

  @Expose()
  @IsDate()
  @Transform(transformDate)
  remittance_date: Date

  @Expose()
  @IsString()
  @Transform(transformDate)
  invoice_date: Date

  @Expose()
  @IsString()
  @Transform(transformString)
  invoice_recipient: string

  @Expose()
  @IsString()
  account_info: string

  @Expose()
  @IsString()
  manager: string

  @Expose()
  @IsOptional()
  @IsInt()
  cl_row_id?: number

  @Expose()
  @IsString()
  manager_phone: string
}
