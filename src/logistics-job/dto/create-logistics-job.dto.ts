import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateLogisticsJobDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @Transform(({ value }) => String(value))
  no: string

  @IsString()
  @Transform(({ value }) => String(value))
  author: string

  @IsString()
  @Transform(({ value }) => String(value))
  progress_item: string

  @IsString()
  @Transform(({ value }) => String(value))
  quantity: string

  @IsDate()
  @Transform(transformDate)
  shipment_date: Date

  @IsString()
  progress_person: string

  @IsDate()
  @Transform(transformDate)
  delivery_date: Date

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  commission: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  additional_cost: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  settlement_cost: number

  @IsDate()
  @Transform(transformDate)
  settlement_date: Date

  @IsString()
  shipping_method: string

  @IsString()
  tracking_number: string

  @IsString()
  remarks: string
}
