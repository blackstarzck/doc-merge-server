import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { excelDateToJSDate } from 'src/utils/date.utils';
import { transformEmptyToNull } from 'src/utils/transform.utils';

export class CreateServiceDeliveryDto {
  @IsOptional()
  @IsInt()
  @Transform(transformEmptyToNull)
  balance: number;

  @IsOptional()
  @Transform(({ value }) => excelDateToJSDate(value))
  balance_date: Date;

  @IsOptional()
  @IsInt()
  @Transform(transformEmptyToNull)
  total_payment: number;

  @IsOptional()
  @IsString()
  notes: string;

  @IsOptional()
  @IsString()
  @Transform(transformEmptyToNull)
  no: number;

  @IsOptional()
  @Transform(({ value }) => excelDateToJSDate(value))
  date: Date;

  @IsOptional()
  bid_org: string;

  @IsOptional()
  win_company: string;

  @IsOptional()
  parent_company: string;

  @IsOptional()
  org_name: string;

  @IsOptional()
  role_person: string;

  @IsOptional()
  bid_num: string;

  @IsOptional()
  @Transform(({ value }) => excelDateToJSDate(value))
  contract_date: Date;

  @IsOptional()
  @Transform(({ value }) => excelDateToJSDate(value))
  delivery_date: Date;

  @IsOptional()
  mark_equip: string;

  @IsOptional()
  @Transform(transformEmptyToNull)
  base_price: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  win_price: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  win_rate: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  purchase_cost: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  final_delivery_quantity: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  final_sales: number;

  @IsOptional()
  payment_method: string;

  @IsOptional()
  @Transform(({ value }) => excelDateToJSDate(value))
  pre_payment_date: Date;

  @IsOptional()
  @Transform(transformEmptyToNull)
  pre_payment: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  expected_balance: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  final_delivery_price: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  final_bk_sales: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  revenue: number;

  @IsOptional()
  @Transform(transformEmptyToNull)
  net_revenue: number;

  @IsOptional()
  @IsString()
  company_contact: string;

  @IsOptional()
  @IsString()
  company_person: string;

  @IsOptional()
  @IsString()
  admin_contact: string;

  @IsOptional()
  @IsString()
  admin_person: string;

  @IsOptional()
  @IsString()
  lib_contact: string;

  @IsOptional()
  @IsString()
  lib_person: string;
}
