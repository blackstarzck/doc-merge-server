import { Transform } from 'class-transformer'
import { IsOptional, IsInt, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformBoolean,
  transformNumber,
  transformIntegerOrNull
} from 'src/common/utils/transform.utils'

export class CreateOrganizationDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  row_num?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  year?: number

  @IsString()
  @Transform(({ value }) => {
    const isNumeric = /^[+-]?\d*\.?\d+$/.test(value)
    return isNumeric ? String(value) : value || ''
  })
  org_name: string

  @IsBoolean()
  @Transform(transformBoolean)
  b_close_status: boolean

  @IsBoolean()
  @Transform(transformBoolean)
  invoice_received: boolean

  @IsString()
  win_company: string

  @IsString()
  parent_company: string

  @IsString()
  category: string

  @IsString()
  notes: string

  @IsString()
  role_person: string

  @IsOptional()
  @IsString()
  cost_rate: string

  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @IsDate()
  @Transform(transformDate)
  delivery_date: Date

  @IsNumber()
  @Transform(transformNumber)
  total_bks: number

  @IsString()
  mark_equip: string

  @IsNumber()
  @Transform(transformNumber)
  bk_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  win_price: number // floor(bk_price * win_rate)

  @IsNumber()
  @Transform(transformNumber)
  win_rate: number

  @IsNumber()
  @Transform(transformNumber)
  bk_supply_price: number // floor(bk_price * bk_supply_rate)

  @IsNumber()
  @Transform(transformNumber)
  bk_supply_rate: number

  @IsNumber()
  @Transform(transformNumber)
  purchase_cost: number // bk_price * bk_cost_late

  @IsNumber()
  @Transform(transformNumber)
  bk_cost_late: number

  @IsNumber()
  @Transform(transformNumber)
  org_m_per_price: number

  @IsNumber()
  @Transform(transformNumber)
  org_m_price: number // total_bks * org_m_per_price

  @IsNumber()
  @Transform(transformNumber)
  m_supply_price: number

  @IsNumber()
  @Transform(transformNumber)
  m_supply_total_price: number // total_bks * m_supply_price

  @IsNumber()
  @Transform(transformNumber)
  out_of_stock_price: number

  @IsNumber()
  @Transform(transformNumber)
  out_of_stock_bks: number

  @IsNumber()
  @Transform(transformNumber)
  final_delivery_quantity: number // total_bks - out_of_stock_bks

  @IsNumber()
  @Transform(transformNumber)
  m_final_sales: number // m_supply_price * m_supply_price

  @IsOptional()
  @IsString()
  payment_method: string

  @IsNumber()
  @Transform(transformNumber)
  payment: number

  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @IsNumber()
  @Transform(transformNumber)
  balance: number

  @IsDate()
  @Transform(transformDate)
  balance_date: Date

  @IsNumber()
  @Transform(transformNumber)
  expected_balance: number // floor(bk_supply_price+m_supply_total_price-pre_payment-balance)

  @IsNumber()
  @Transform(transformNumber)
  total_payment: number

  @IsNumber()
  @Transform(transformNumber)
  final_delivery_price: number // bk_price - out_of_stock_bks

  @IsNumber()
  @Transform(transformNumber)
  final_bk_sales: number // bk_supply_rate * m_supply_price

  @IsNumber()
  @Transform(transformNumber)
  bk_revenue: number // final_bk_sales-(m_supply_price*bk_cost_late)

  @IsOptional()
  @IsNumber()
  @Transform(transformNumber)
  d_day: number // d-day(delivery_date-today_date)

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  today_date: Date

  @IsOptional()
  @IsNumber()
  @Transform(transformNumber)
  net_revenue: number

  @IsString()
  sheet_name: string

  @IsNumber()
  @Transform(transformNumber)
  sheet_data_num: number
}
