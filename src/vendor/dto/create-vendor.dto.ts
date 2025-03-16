import { IsString, IsOptional, IsInt, IsNotEmpty } from 'class-validator'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateVendorDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty()
  name: string

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty()
  representative: string

  @IsString({ message: stringValidationMessage })
  mobile_phone: string

  @IsString({ message: stringValidationMessage })
  office_phone: string

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty()
  email: string

  @IsString({ message: stringValidationMessage })
  shipping_rate: string

  @IsString({ message: stringValidationMessage })
  payment: string

  @IsString({ message: stringValidationMessage })
  notes: string
}
