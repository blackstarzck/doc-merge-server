import { Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'

export class CreateMarkClientDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  @IsNotEmpty({ message: '거래처명은 필수입니다.' })
  name: string

  @IsString()
  ip_address: string

  @IsString()
  phone: string

  @IsString()
  email: string

  @IsString()
  address: string

  @IsString()
  @IsOptional()
  notes?: string
}
