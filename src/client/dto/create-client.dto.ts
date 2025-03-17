import { Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'

export class CreateClientDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @IsNotEmpty()
  name: string
}
