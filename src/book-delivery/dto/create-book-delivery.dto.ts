import { IsOptional, IsInt, IsString, IsNumber, IsDate, IsBoolean } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformBoolean,
  transformNumber,
  transformIntegerOrNull,
  transformString,
  transStringRateToFloat
} from 'src/common/utils/transform.utils'
import { Transform } from 'class-transformer'

export class CreateBookDeliveryDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsNumber()
  @Transform(transformNumber)
  balance: number

  @IsDate()
  @Transform(transformDate)
  balance_date: Date

  @IsNumber()
  @Transform(transformNumber)
  total_payment: number

  @IsString()
  notes: string

  @IsNumber()
  @Transform(transformNumber)
  no: number

  @IsBoolean()
  @Transform(transformBoolean)
  b_close_status: boolean

  @IsBoolean()
  @Transform(transformBoolean)
  b_invoice: boolean

  @IsString()
  continue_type: string

  @IsString()
  bid_org: string

  @IsString()
  sales_company: string

  @IsString()
  win_company: string

  @IsString()
  @Transform(transformString)
  parent_company: string

  @IsString()
  org_name: string

  @IsString()
  purchase_price: string

  @IsString()
  mark_equip: string

  @IsString()
  sub_status: string

  @IsString()
  @Transform(transformString)
  outsourcing_company: string

  @IsString()
  role_person: string

  @IsString()
  bid_number: string

  @IsDate()
  @Transform(transformDate)
  contract_date: Date

  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @IsDate()
  @Transform(transformDate)
  delivery_deadline: Date

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  total_bks?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  base_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  win_price?: number

  @IsNumber()
  @Transform(transStringRateToFloat)
  win_rate: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  bk_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  bk_supply_price?: number

  @IsString()
  bk_supply_rate: string

  @IsNumber()
  @Transform(transStringRateToFloat)
  bk_cost_rate: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  company_revenue?: number

  @IsNumber()
  @Transform(transStringRateToFloat)
  company_revenue_rate: number

  @IsNumber()
  @Transform(transformNumber)
  our_revenue_rate: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  org_m_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  org_m_equip_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_supply_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_supply_total_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  out_of_stock_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  out_of_stock_bks?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_delivery_bks?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_final_sales?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  pre_payment?: number

  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  expected_balance?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_delivery_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_bk_sales?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  our_revenue?: number

  @IsString()
  admin_contact: string

  @IsString()
  lib_contact: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  d_day?: number

  @IsDate()
  @Transform(transformDate)
  today_date: Date

  @IsOptional()
  @IsInt()
  client_ledger_id?: number

  @IsOptional()
  @IsInt()
  vendor_ledger_id?: number
}
