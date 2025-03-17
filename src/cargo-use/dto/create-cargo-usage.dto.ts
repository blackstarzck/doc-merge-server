import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'
import { transformDate } from 'src/common/utils/date.utils'
import { transformFloat, transformIntegerOrNull } from 'src/common/utils/transform.utils'

export class CreateCargoUseDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @Transform(({ value }) => String(value))
  no: string

  @IsString()
  author: string

  @IsString()
  destination: string

  @IsString()
  progress_item: string

  @IsString()
  @Transform(({ value }) => String(value))
  quantity: string

  @IsDate()
  @Transform(transformDate)
  shipment_date: Date

  @IsString()
  company: string

  @IsDate()
  @Transform(transformDate)
  delivery_date: Date

  @IsNumber()
  @Transform(transformFloat)
  cost: number

  @IsString()
  @Transform(({ value }) => String(value))
  additional_cost: string

  @IsNumber()
  @Transform(transformFloat)
  settlement_cost: number

  @IsDate()
  @Transform(transformDate)
  settlement_date: Date

  @IsString()
  vehicle: string

  @IsString()
  remarks: string
}
