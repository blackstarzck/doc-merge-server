import { Transform } from 'class-transformer'
import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateVendorDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  representative: string

  @IsString()
  mobile_phone: string

  @IsString()
  office_phone: string

  @IsString()
  email: string

  @IsString()
  shipping_rate: string

  @IsString()
  payment: string

  @IsString()
  notes: string
}
