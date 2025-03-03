import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { transformDate } from 'src/common/utils/date.utils';
import { transformEmptyToNull } from 'src/common/utils/transform.utils';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';

export class CreateServiceDeliveryDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsInt()
  @Transform(transformEmptyToNull)
  balance: number;

  @Transform(transformDate)
  balance_date: Date;

  @IsInt()
  @Transform(transformEmptyToNull)
  total_payment: number;

  @IsString({ message: stringValidationMessage })
  notes: string;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  no: string;

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

  @Transform(transformDate)
  contract_date: Date;

  @Transform(transformDate)
  delivery_date: Date;

  @IsString({ message: stringValidationMessage })
  mark_equip: string;

  @Transform(transformEmptyToNull)
  base_price: number;

  @Transform(transformEmptyToNull)
  win_price: number;

  @Transform(transformEmptyToNull)
  win_rate: number;

  @Transform(transformEmptyToNull)
  purchase_cost: number;

  @Transform(transformEmptyToNull)
  final_delivery_quantity: number;

  @Transform(transformEmptyToNull)
  final_sales: number;

  @IsString({ message: stringValidationMessage })
  payment_method: string;

  @Transform(transformDate)
  pre_payment_date: Date;

  @Transform(transformEmptyToNull)
  pre_payment: number;

  @Transform(transformEmptyToNull)
  expected_balance: number;

  @Transform(transformEmptyToNull)
  final_delivery_price: number;

  @Transform(transformEmptyToNull)
  final_bk_sales: number;

  @Transform(transformEmptyToNull)
  revenue: number;

  @Transform(transformEmptyToNull)
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
