import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsDate, IsNumber } from 'class-validator';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';
import { transformDate } from 'src/common/utils/date.utils';
import {
  transformEmptyToNull,
  transformFloat,
} from 'src/common/utils/transform.utils';

export class CreateBookDisposalDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsNumber()
  @Transform(transformFloat)
  no: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  date: Date;

  @IsString({ message: stringValidationMessage })
  win_company: string;

  @IsString({ message: stringValidationMessage })
  parent_company: string;

  @IsString({ message: stringValidationMessage })
  category: string;

  @IsString({ message: stringValidationMessage })
  org_name: string;

  @IsString({ message: stringValidationMessage })
  status: string;

  @IsString({ message: stringValidationMessage })
  cost: string;

  @IsString({ message: stringValidationMessage })
  role_person: string;

  @IsString({ message: stringValidationMessage })
  mark_equip: string;

  @IsNumber()
  @Transform(transformFloat)
  final_delivery_bks: number;

  @IsNumber()
  @Transform(transformFloat)
  final_sales: number;

  @IsNumber()
  @Transform(transformFloat)
  expend_cost: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  pre_payment_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  pre_payment: number;

  @IsNumber()
  @Transform(transformFloat)
  expected_balance: number;

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

  @IsNumber()
  @Transform(transformFloat)
  revenue: number;

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
}
