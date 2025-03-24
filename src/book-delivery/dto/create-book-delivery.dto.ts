import {
  IsOptional,
  IsInt,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsNotEmpty
} from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformBoolean,
  transformNumber,
  transformIntegerOrNull,
  transformString,
  transStringRateToFloat
} from 'src/common/utils/transform.utils'
import { Expose, Transform } from 'class-transformer'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'

export class CreateBookDeliveryDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  balance: number

  @Expose()
  @IsDate()
  @Transform(transformDate)
  balance_date: Date

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  total_payment: number

  @Expose()
  @IsString()
  notes: string

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  no: number

  @Expose()
  @IsBoolean()
  @Transform(transformBoolean)
  b_close_status: boolean

  @Expose()
  @IsBoolean()
  @Transform(transformBoolean)
  invoice_received: boolean

  @Expose()
  @IsString()
  continue_type: string

  @Expose()
  @IsString()
  bid_org: string

  @Expose()
  @IsString()
  sales_company: string

  @Expose()
  @IsString()
  win_company: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Transform(transformString)
  parent_company: string

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformNumber)
  parent_company_id?: number // book_deliver

  @Expose()
  @IsString()
  org_name: string

  @Expose()
  @IsString()
  purchase_price: string

  @Expose()
  @IsString()
  mark_equip: string

  @Expose()
  @IsString()
  sub_status: string

  @Expose()
  @IsString()
  @Transform(transformString)
  outsourcing_company: string

  @Expose()
  @IsInt()
  @Transform(transformIntegerOrNull)
  outsourcing_company_id?: number

  @Expose()
  @IsString()
  // @Transform(transformString)
  role_person: string

  @Expose()
  @IsString()
  bid_number: string

  @Expose()
  @IsDate()
  @Transform(transformDate)
  contract_date: Date

  @Expose()
  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @Expose()
  @IsDate()
  @Transform(transformDate)
  delivery_deadline: Date

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  total_bks?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  base_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  win_price?: number

  @Expose()
  @IsNumber()
  @Transform(transStringRateToFloat)
  win_rate: number

  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(transformNumber)
  bk_price?: number

  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(transformNumber)
  bk_supply_price?: number

  @Expose()
  @IsString()
  bk_supply_rate: string

  @Expose()
  @IsNumber()
  @Transform(transStringRateToFloat)
  bk_cost_rate: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  company_revenue?: number

  @Expose()
  @IsNumber()
  @Transform(transStringRateToFloat)
  company_revenue_rate: number

  @Expose()
  @IsNumber()
  @Transform(transformNumber)
  our_revenue_rate: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  org_m_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  org_m_equip_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_supply_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_supply_total_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  out_of_stock_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  out_of_stock_bks?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_delivery_bks?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  m_final_sales?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  pre_payment?: number

  @Expose()
  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  expected_balance?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_delivery_price?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_bk_sales?: number

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  our_revenue?: number

  @Expose()
  @IsString()
  admin_contact: string

  @Expose()
  @IsString()
  lib_contact: string

  @Expose()
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  d_day?: number

  @Expose()
  @IsDate()
  @Transform(transformDate)
  today_date: Date

  @Expose()
  @IsOptional()
  @IsInt()
  cl_row_id?: number

  @Expose()
  @IsOptional()
  @IsInt()
  vl_row_id?: number

  @Expose()
  @IsOptional()
  client_ledger?: ClientLedgerModel

  @Expose()
  @IsOptional()
  vendor_ledger?: VendorLedgerModel
}
