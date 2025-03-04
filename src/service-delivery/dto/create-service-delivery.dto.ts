import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { transformDate } from 'src/common/utils/date.utils';
import {
  transformEmptyToNull,
  transformFloat,
} from 'src/common/utils/transform.utils';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';

export class CreateServiceDeliveryDto {
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

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  no: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  date: Date;

  @IsString({ message: stringValidationMessage })
  bid_org: string;

  @IsString({ message: stringValidationMessage })
  win_company: string;

  @IsString({ message: stringValidationMessage })
  parent_company: string;

  @IsString({ message: stringValidationMessage })
  org_name: string;

  @IsString({ message: stringValidationMessage })
  role_person: string;

  @IsString({ message: stringValidationMessage })
  bid_num: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  contract_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  delivery_date: Date;

  @IsString({ message: stringValidationMessage })
  mark_equip: string;

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
  purchase_cost: number;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_quantity: number;

  @IsNumber()
  @Transform(transformFloat)
  final_sales: number;

  @IsString({ message: stringValidationMessage })
  payment_method: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  pre_payment_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  pre_payment: number;

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
  revenue: number;

  @IsNumber()
  @Transform(transformFloat)
  net_revenue: number;

  @IsString({ message: stringValidationMessage })
  company_contact: string;

  @IsString({ message: stringValidationMessage })
  company_person: string;

  @IsString({ message: stringValidationMessage })
  admin_contact: string;

  @IsString({ message: stringValidationMessage })
  admin_person: string;

  @IsString({ message: stringValidationMessage })
  lib_contact: string;

  @IsString({ message: stringValidationMessage })
  lib_person: string;
}
