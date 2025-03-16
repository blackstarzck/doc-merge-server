import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateOrganizationNameDto {
  @IsOptional()
  @IsInt()
  id?: number

  @IsString({ message: stringValidationMessage })
  @IsNotEmpty()
  name: string
}
