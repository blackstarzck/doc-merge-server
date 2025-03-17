import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator'
import { Transform, Type } from 'class-transformer'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'

export enum CategoryType {
  ONETIME = '단일',
  ANNUAL = '연간'
}

export class CreateMarkStatusDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  number: number

  @IsDate()
  @Type(() => Date)
  entry_date: Date

  @IsString()
  equipment: string

  @IsEnum(CategoryType)
  category: CategoryType

  @IsString()
  name: string

  @IsString()
  completion_month: string

  @IsString()
  region: string

  @IsString()
  destination: string

  @IsString()
  contracted_company: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  quantity: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  final_settlement_quantity: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  settlement_amount: number

  @IsString()
  settlement_month: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  sales_amount: number

  @IsDate()
  @Type(() => Date)
  deposit_date: Date

  @IsString()
  order: string

  @IsDate()
  @Type(() => Date)
  delivery_deadline: Date

  @IsString()
  notes: string

  @IsDate()
  @Type(() => Date)
  list_delivery: Date

  @IsDate()
  @Type(() => Date)
  ip_delivery: Date

  @IsDate()
  @Type(() => Date)
  mark_request: Date

  @IsDate()
  @Type(() => Date)
  mark_completion: Date

  @IsDate()
  @Type(() => Date)
  out_of_stock: Date

  @IsDate()
  @Type(() => Date)
  equipment_start: Date

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  personnel_count: number

  @IsDate()
  @Type(() => Date)
  completion: Date

  @IsString()
  out_of_stock_status: string

  @IsString()
  contact: string

  @IsString()
  manager: string
}
