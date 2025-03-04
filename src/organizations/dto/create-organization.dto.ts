import { Transform } from 'class-transformer';
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
  transformFloat,
} from 'src/common/utils/transform.utils';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';
export class CreateOrganizationDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsNumber()
  @Transform(transformFloat)
  row_num: number;

  @IsString({ message: stringValidationMessage })
  org_name: string;

  @IsBoolean()
  @Transform(transformBoolean)
  b_close_date: boolean;

  @IsBoolean()
  @Transform(transformBoolean)
  b_invoice: boolean;

  @IsString({ message: stringValidationMessage })
  win_company: string;

  @IsString({ message: stringValidationMessage })
  parent_company: string;

  @IsString({ message: stringValidationMessage })
  category: string;

  @IsString({ message: stringValidationMessage })
  notes: string;

  @IsString({ message: stringValidationMessage })
  role_person: string;

  @IsString({ message: stringValidationMessage })
  cost_rate: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  order_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  delivery_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  total_bks: number;

  @IsString({ message: stringValidationMessage })
  mark_equip: string;

  @IsNumber()
  @Transform(transformFloat)
  bk_price: number;

  @IsNumber()
  @Transform(transformFloat)
  win_price: number; // floor(bk_price * win_rate)

  @IsNumber()
  @Transform(transformFloat)
  win_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  bk_supply_price: number; // floor(bk_price * bk_supply_rate)

  @IsNumber()
  @Transform(transformFloat)
  bk_supply_rate: number;

  @IsNumber()
  @Transform(transformFloat)
  purchase_cost: number; // bk_price * bk_cost_late

  @IsNumber()
  @Transform(transformFloat)
  bk_cost_late: number;

  @IsNumber()
  @Transform(transformFloat)
  org_m_per_price: number;

  @IsNumber()
  @Transform(transformFloat)
  org_m_price: number; // total_bks * org_m_per_price

  @IsNumber()
  @Transform(transformFloat)
  m_supply_price: number;

  @IsNumber()
  @Transform(transformFloat)
  m_supply_total_price: number; // total_bks * m_supply_price

  @IsNumber()
  @Transform(transformFloat)
  out_of_stock_price: number;

  @IsNumber()
  @Transform(transformFloat)
  out_of_stock_bks: number;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_quantity: number; // total_bks - out_of_stock_bks

  @IsNumber()
  @Transform(transformFloat)
  m_final_sales: number; // m_supply_price * m_supply_price

  @IsString({ message: stringValidationMessage })
  payment_method: string;

  @IsNumber()
  @Transform(transformFloat)
  payment: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  pre_payment_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  balance: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  balance_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  expected_balance: number; // floor(bk_supply_price+m_supply_total_price-pre_payment-balance)

  @IsNumber()
  @Transform(transformFloat)
  total_payment: number;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_price: number; // bk_price - out_of_stock_bks

  @IsNumber()
  @Transform(transformFloat)
  final_bk_sales: number; // bk_supply_rate * m_supply_price

  @IsNumber()
  @Transform(transformFloat)
  bk_revenue: number; // final_bk_sales-(m_supply_price*bk_cost_late)

  @IsNumber()
  @Transform(transformFloat)
  d_day: number; // d-day(delivery_date-today_date)

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  today_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  net_revenue: number;

  @IsNumber()
  @Transform(transformFloat)
  revenue_rate: number;

  @IsString({ message: stringValidationMessage })
  sheet_name: string;

  @IsNumber()
  @Transform(transformFloat)
  sheet_data_num: number;
}
