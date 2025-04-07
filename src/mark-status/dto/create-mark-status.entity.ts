import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { transformDate, transformIntegerOrNull } from 'src/common/utils/transform.utils'

export class CreateMarkStatusDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsOptional()
  @IsString()
  mark_client?: string

  @IsOptional()
  @IsInt()
  mark_client_id?: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  no: number

  @IsDate()
  @Transform(transformDate)
  entry_date: Date

  @IsString()
  equipment: string

  @IsString()
  category: string

  @IsString()
  completion_month: string

  @IsOptional()
  @IsString()
  region?: string

  @IsString()
  destination: string

  @IsString()
  contracted_company: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  quantity: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  final_settlement_quantity: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  settlement_amount: number

  @IsString()
  settlement_month: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  sales_amount: number

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  deposit_date?: Date

  @IsString()
  order: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  delivery_deadline?: Date

  @IsString()
  notes: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  list_delivery?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  ip_delivery?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  mark_request?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  mark_completion?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  out_of_stock?: Date

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  equipment_start?: Date

  @IsInt()
  @Transform(transformIntegerOrNull)
  personnel_count: number

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  completion?: Date

  @IsString()
  out_of_stock_status: string

  @IsOptional()
  @IsString()
  contact?: string

  @IsOptional()
  @IsString()
  manager?: string
}
