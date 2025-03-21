import { IsString, IsInt, IsDate, IsOptional, IsNumber } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformIntegerOrNull, transformNumber } from 'src/common/utils/transform.utils'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  id?: number

  @Expose()
  @IsString()
  parent_company: string // book_deliver

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformNumber)
  parent_company_id?: number // book_deliver

  @Expose()
  @IsString()
  no: string

  @Expose()
  @IsString()
  details: string

  @Expose()
  @IsString()
  order_status: string

  @Expose()
  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @Expose()
  @IsString()
  deposit_status: string

  @Expose()
  @IsDate()
  @Transform(transformDate)
  deposit_date: Date

  @Expose()
  @IsString()
  pre_payment_status: string

  @Expose()
  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  bk_price: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  bk_supply_rate: number // book_delivery

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  bk_supply_price: number // book_delivery

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  total_payment: number // book_delivery

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  purchase_rate: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  purchase_amount: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  profit_rate: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  profit: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  balance: number

  @Expose()
  @IsDate()
  @Transform(transformDate)
  invoice_date: Date

  @Expose()
  @IsString()
  remarks: string

  @Expose()
  @IsOptional()
  @IsInt()
  cl_row_id?: number
}
