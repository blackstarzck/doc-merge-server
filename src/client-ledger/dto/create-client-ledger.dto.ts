import { IsString, IsInt, IsDate, IsOptional, IsNumber, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformNumber } from 'src/common/utils/transform.utils'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsNotEmpty()
  @IsString()
  client: string

  @IsNotEmpty()
  @IsInt()
  client_id: number

  @IsString()
  no: string

  @IsString()
  details: string

  @IsString()
  order_status: string

  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @IsString()
  deposit_status: string

  @IsDate()
  @Transform(transformDate)
  deposit_date: Date

  @IsString()
  pre_payment_status: string

  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @IsNumber()
  @Transform(transformNumber)
  bk_price: number

  @IsNumber()
  @Transform(transformNumber)
  bk_supply_rate: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  bk_supply_price: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  total_payment: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  purchase_rate: number

  @IsNumber()
  @Transform(transformNumber)
  purchase_price: number

  @IsNumber()
  @Transform(transformNumber)
  our_revenue_rate: number

  @IsNumber()
  @Transform(transformNumber)
  our_revenue: number

  @IsNumber()
  @Transform(transformNumber)
  balance: number

  @IsDate()
  @Transform(transformDate)
  invoice_date: Date

  @IsString()
  remarks: string

  @IsOptional()
  @IsInt()
  cl_row_id?: number
}
