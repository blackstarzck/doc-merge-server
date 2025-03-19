import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformEmptyToNull,
  transformNumber,
  transformIntegerOrNull
} from 'src/common/utils/transform.utils'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateServiceDeliveryDto {
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

  @IsString()
  @Transform(({ value }) => String(value))
  no: string

  @IsDate()
  @Transform(transformDate)
  date: Date

  @IsString()
  bid_org: string

  @IsString()
  win_company: string

  @IsString()
  parent_company: string

  @IsString()
  org_name: string

  @IsString()
  role_person: string

  @IsString()
  bid_num: string

  @IsDate()
  @Transform(transformDate)
  contract_date: Date

  @IsDate()
  @Transform(transformDate)
  delivery_date: Date

  @IsString()
  mark_equip: string

  @IsNumber()
  @Transform(transformNumber)
  base_price: number

  @IsNumber()
  @Transform(transformNumber)
  win_price: number

  @IsNumber()
  @Transform(transformNumber)
  win_rate: number

  @IsNumber()
  @Transform(transformNumber)
  purchase_cost: number

  @IsNumber()
  @Transform(transformNumber)
  final_delivery_quantity: number

  @IsNumber()
  @Transform(transformNumber)
  final_sales: number

  @IsString()
  payment_method: string

  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @IsNumber()
  @Transform(transformNumber)
  pre_payment: number

  @IsNumber()
  @Transform(transformNumber)
  expected_balance: number

  @IsNumber()
  @Transform(transformNumber)
  final_delivery_price: number

  @IsNumber()
  @Transform(transformNumber)
  final_bk_sales: number

  @IsNumber()
  @Transform(transformNumber)
  revenue: number

  @IsNumber()
  @Transform(transformNumber)
  net_revenue: number

  @IsString()
  company_contact: string

  @IsString()
  company_person: string

  @IsString()
  admin_contact: string

  @IsString()
  admin_person: string

  @IsString()
  lib_contact: string

  @IsString()
  lib_person: string
}
