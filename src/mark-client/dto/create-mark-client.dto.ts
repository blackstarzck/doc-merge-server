import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateMarkClientDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty({ message: '거래처명은 필수입니다.' })
  name: string

  @IsString({ message: stringValidationMessage })
  ip_address: string

  @IsString({ message: stringValidationMessage })
  phone: string

  @IsString({ message: stringValidationMessage })
  email: string

  @IsString({ message: stringValidationMessage })
  address: string

  @IsString({ message: stringValidationMessage })
  @IsOptional()
  notes?: string
}
