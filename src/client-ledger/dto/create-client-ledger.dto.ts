import { IsString, IsInt, IsDate, IsOptional, IsNumber, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformNumber } from 'src/common/utils/transform.utils'
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsNotEmpty()
  @IsString()
  client: string

  @IsOptional()
  @IsInt()
  client_id?: number

  @IsOptional()
  @IsString()
  no?: string

  @IsString()
  details: string

  @IsString()
  order_status: string

  @IsDate()
  @Transform(transformDate)
  cl_order_date?: Date

  @IsString()
  deposit_status: string

  @IsDate()
  @Transform(transformDate)
  deposit_date?: Date

  @IsString()
  pre_payment_status: string

  @IsDate()
  @Transform(transformDate)
  cl_pre_payment_date?: Date

  @IsNumber()
  @Transform(transformNumber)
  cl_bk_price: number

  @IsNumber()
  @Transform(transformNumber)
  cl_bk_supply_price: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  cl_bk_supply_rate: number // book_delivery

  @IsOptional()
  @IsNumber()
  @Transform(transformNumber)
  bk_supply_price?: number

  @IsNumber()
  @Transform(transformNumber)
  cl_total_payment: number // book_delivery

  @IsNumber()
  @Transform(transformNumber)
  cl_purchase_rate: number

  @IsNumber()
  @Transform(transformNumber)
  cl_purchase_price: number

  @IsNumber()
  @Transform(transformNumber)
  cl_our_revenue_rate: number

  @IsNumber()
  @Transform(transformNumber)
  cl_our_revenue: number

  @IsNumber()
  @Transform(transformNumber)
  expected_balance: number

  @IsDate()
  @Transform(transformDate)
  cl_invoice_date?: Date

  @IsString()
  remarks: string

  @IsOptional()
  @IsInt()
  cl_row_id?: number

  @IsOptional()
  bookDelivery?: BookDeliveryModel
}
