import { IsString, IsInt, IsDate, IsOptional, IsNumber } from 'class-validator'
import { Transform } from 'class-transformer'
import { transformDate } from 'src/common/utils/date.utils'
import { transformFloat, transformIntegerOrNull } from 'src/common/utils/transform.utils'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

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

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  bk_price: number

  @IsNumber()
  @Transform(transformFloat)
  supply_rate: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  bk_supply_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  total_payment: number

  @IsNumber()
  @Transform(transformFloat)
  purchase_rate: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  purchase_amount: number

  @IsNumber()
  @Transform(transformFloat)
  profit_rate: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  profit: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  balance: number

  @IsDate()
  @Transform(transformDate)
  invoice_date: Date

  @IsString()
  remarks: string
}
