import {
  IsOptional,
  IsInt,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsNotEmpty
} from 'class-validator'
import { Transform } from 'class-transformer'
import {
  transformBoolean,
  transformIntegerOrNull,
  transformString,
  transStringRateToFloat,
  transformDate
} from 'src/common/utils/transform.utils'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'

export class CreateBookDeliveryDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  no: number

  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  b_close_status?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(transformBoolean)
  invoice_received?: boolean

  @IsOptional()
  @IsString()
  @Transform(transformString)
  continue_type?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  bid_org?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  sales_company?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  win_company?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  parent_company?: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  parent_company_id?: number

  @IsOptional()
  @IsString()
  @Transform(transformString)
  org_name?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  purchase_price?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  mark_equip?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  sub_status?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  notes?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  outsourcing_company?: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  outsourcing_company_id?: number

  @IsOptional()
  @IsString()
  @Transform(transformString)
  role_person?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  bid_number?: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  contract_date?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  delivery_deadline?: Date

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  total_bks?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  win_price?: number

  @IsOptional()
  @IsNumber()
  @Transform(transStringRateToFloat)
  win_rate?: number

  @IsOptional()
  @IsNumber()
  @Transform(transStringRateToFloat)
  bk_cost_rate?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  company_revenue?: number

  @IsOptional()
  @IsNumber()
  @Transform(transStringRateToFloat)
  company_revenue_rate?: number

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

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  balance?: number

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  balance_date?: Date

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_delivery_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  final_bk_sales?: number

  @IsOptional()
  @IsString()
  @Transform(transformString)
  admin_contact?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  lib_contact?: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  d_day?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  cl_row_id?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vl_row_id?: number

  @IsOptional()
  client_ledger?: ClientLedgerModel

  @IsOptional()
  vendor_ledger?: VendorLedgerModel
}
