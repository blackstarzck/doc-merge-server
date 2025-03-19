import { IsString, IsInt, IsDate, IsOptional, IsNumber } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformNumber } from 'src/common/utils/transform.utils'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  @Expose()
  id?: number

  @IsString()
  @Expose()
  parent_company: string // book_deliver

  @IsOptional()
  @IsInt()
  @Transform(transformNumber)
  @Expose()
  parent_company_id?: number // book_deliver

  @IsString()
  @Expose()
  no: string

  @IsString()
  @Expose()
  details: string

  @IsString()
  order_status: string

  @IsDate()
  @Transform(transformDate)
  @Expose()
  order_date: Date

  @IsString()
  @Expose()
  deposit_status: string

  @IsDate()
  @Transform(transformDate)
  @Expose()
  deposit_date: Date

  @IsString()
  @Expose()
  pre_payment_status: string

  @IsDate()
  @Transform(transformDate)
  @Expose()
  pre_payment_date: Date

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  bk_price: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  bk_supply_rate: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  bk_supply_price: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  total_payment: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  purchase_rate: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  purchase_amount: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  profit_rate: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  profit: number

  @IsNumber()
  @Transform(transformNumber)
  @Expose()
  balance: number

  @IsDate()
  @Transform(transformDate)
  @Expose()
  invoice_date: Date

  @IsString()
  @Expose()
  remarks: string
}
