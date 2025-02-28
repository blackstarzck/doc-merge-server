import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsString, IsNumber, IsDate } from 'class-validator';
import { BookDeliveryModel } from '../entity/book-delivery.entity';
import { excelDateToJSDate } from 'src/common/utils/date.utils';
import { transformEmptyToNull } from 'src/common/utils/transform.utils';
import { Transform } from 'class-transformer';
import { floatValidationMessage } from 'src/common/validation-message/float-validation-message';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';

export class CreateBookDeliveryDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @Transform(transformEmptyToNull)
  balance: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  balance_date: Date;

  @Transform(transformEmptyToNull)
  total_payment: number;

  @IsString({ message: stringValidationMessage })
  notes: string;

  @IsNumber()
  @Transform(transformEmptyToNull)
  no: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  b_close_status: boolean;

  @IsNumber()
  @Transform(transformEmptyToNull)
  b_invoice: boolean;

  @IsString({ message: stringValidationMessage })
  continue_type: string;

  @IsString({ message: stringValidationMessage })
  bid_org: string;

  @IsString({ message: stringValidationMessage })
  sales_company: string;

  @IsString({ message: stringValidationMessage })
  win_company: string;

  @IsString({ message: stringValidationMessage })
  parent_company: string;

  @IsString({ message: stringValidationMessage })
  org_name: string;

  @IsString({ message: stringValidationMessage })
  purchase_price: string;

  @IsString({ message: stringValidationMessage })
  mark_equip: string;

  @IsString({ message: stringValidationMessage })
  sub_status: string;

  @IsString({ message: stringValidationMessage })
  outsourcing_company: string;

  @IsString({ message: stringValidationMessage })
  role_person: string;

  @IsString({ message: stringValidationMessage })
  bid_number: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  contract_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  order_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  delivery_deadline: Date;

  @IsNumber()
  @Transform(transformEmptyToNull)
  total_bks: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  base_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  win_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  win_rate: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  bk_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  bk_supply_price: number;

  @Transform(transformEmptyToNull)
  @IsString({ message: stringValidationMessage })
  bk_supply_rate: string;

  @IsNumber()
  @Transform(transformEmptyToNull)
  bk_cost_rate: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  company_revenue: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  company_revenue_rate: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  our_revenue_rate: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  org_m_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  org_m_equip_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  m_supply_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  m_supply_total_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  out_of_stock_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  out_of_stock_bks: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  final_delivery_bks: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  m_final_sales: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  pre_payment: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  pre_payment_date: Date;

  @IsNumber()
  @Transform(transformEmptyToNull)
  expected_balance: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  final_delivery_price: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  final_bk_sales: number;

  @IsNumber()
  @Transform(transformEmptyToNull)
  our_revenue: number;

  @IsString({ message: stringValidationMessage })
  admin_contact: string;

  @IsString({ message: stringValidationMessage })
  lib_contact: string;

  @IsNumber()
  @Transform(transformEmptyToNull)
  d_day: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  today_date: Date;
}

// 'UPDATE "book_delivery_model" SET "balance_date" = $1,
// "contract_date" = $2,
// "order_date" = $3,
// "delivery_deadline" = $4,
// "total_bks" = $5,
// "pre_payment_date" = $6,
// "today_date" = $7 WHERE "id" IN ($8)',
