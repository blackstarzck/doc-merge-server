import {
  IsOptional,
  IsInt,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { transformDate } from 'src/common/utils/date.utils';
import {
  transformBoolean,
  transformEmptyToNull,
  transformFloat,
} from 'src/common/utils/transform.utils';
import { Transform } from 'class-transformer';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';

export class CreateBookDeliveryDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsNumber()
  @Transform(transformFloat)
  balance: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  balance_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  total_payment: number;

  @IsString({ message: stringValidationMessage })
  notes: string;

  @IsNumber()
  @Transform(transformFloat)
  no: number;

  @IsBoolean()
  @Transform(transformBoolean)
  b_close_status: boolean;

  @IsBoolean()
  @Transform(transformBoolean)
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
  @Transform(transformDate)
  contract_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  order_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  delivery_deadline: Date;

  @IsNumber()
  @Transform(transformFloat)
  total_bks: number;

  @IsNumber()
  @Transform(transformFloat)
  base_price: number;

  @IsNumber()
  @Transform(transformFloat)
  win_price: number;

  @IsNumber()
  @Transform(transformFloat)
  win_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  bk_price: number;

  @IsNumber()
  @Transform(transformFloat)
  bk_supply_price: number;

  @IsString({ message: stringValidationMessage })
  bk_supply_rate: string;

  @IsNumber()
  @Transform(transformFloat)
  bk_cost_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  company_revenue: number;

  @IsNumber()
  @Transform(transformFloat)
  company_revenue_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  our_revenue_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  org_m_price: number;

  @IsNumber()
  @Transform(transformFloat)
  org_m_equip_price: number;

  @IsNumber()
  @Transform(transformFloat)
  m_supply_price: number;

  @IsNumber()
  @Transform(transformFloat)
  m_supply_total_price: number;

  @IsNumber()
  @Transform(transformFloat)
  out_of_stock_price: number;

  @IsNumber()
  @Transform(transformFloat)
  out_of_stock_bks: number;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_bks: number;

  @IsNumber()
  @Transform(transformFloat)
  m_final_sales: number;

  @IsNumber()
  @Transform(transformFloat)
  pre_payment: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  pre_payment_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  expected_balance: number;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_price: number;

  @IsNumber()
  @Transform(transformFloat)
  final_bk_sales: number;

  @IsNumber()
  @Transform(transformFloat)
  our_revenue: number;

  @IsString({ message: stringValidationMessage })
  admin_contact: string;

  @IsString({ message: stringValidationMessage })
  lib_contact: string;

  @IsNumber()
  @Transform(transformFloat)
  d_day: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  today_date: Date;
}
