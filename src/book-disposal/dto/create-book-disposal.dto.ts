import { Transform } from 'class-transformer'
import { IsOptional, IsInt, IsString, IsDate, IsNumber } from 'class-validator'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'
import { transformDate } from 'src/common/utils/date.utils'
import {
  transformEmptyToNull,
  transformFloat,
  transformIntegerOrNull
} from 'src/common/utils/transform.utils'

export class CreateBookDisposalDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsNumber()
  @Transform(transformFloat)
  no: number

  @IsDate()
  @Transform(transformDate)
  date: Date

  @IsString()
  win_company: string

  @IsString()
  parent_company: string

  @IsString()
  category: string

  @IsString()
  org_name: string

  @IsString()
  status: string

  @IsString()
  cost: string

  @IsString()
  role_person: string

  @IsString()
  mark_equip: string

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_bks: number

  @IsNumber()
  @Transform(transformFloat)
  final_sales: number

  @IsNumber()
  @Transform(transformFloat)
  expend_cost: number

  @IsDate()
  @Transform(transformDate)
  pre_payment_date: Date

  @IsNumber()
  @Transform(transformFloat)
  pre_payment: number

  @IsNumber()
  @Transform(transformFloat)
  expected_balance: number

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

  @IsNumber()
  @Transform(transformFloat)
  revenue: number

  @IsNumber()
  @Transform(transformFloat)
  balance: number

  @IsDate()
  @Transform(transformDate)
  balance_date: Date

  @IsNumber()
  @Transform(transformFloat)
  total_payment: number

  @IsString()
  @Transform(transformEmptyToNull)
  notes: string
}
