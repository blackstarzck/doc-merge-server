import { IsString, IsInt, IsDate, IsOptional, IsNumber, IsNotEmpty } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformNumber } from 'src/common/utils/transform.utils'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsNotEmpty()
  @IsString()
  @Expose()
  client: string

  @IsNotEmpty()
  @IsInt()
  @Expose()
  client_id: number

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
  purchase_price: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  our_revenue_rate: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  our_revenue: number

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
