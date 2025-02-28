import { Transform } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsDate } from 'class-validator';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';
import { excelDateToJSDate } from 'src/common/utils/date.utils';
import { transformEmptyToNull } from 'src/common/utils/transform.utils';

export class CreateBookDisposalDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  no: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  date: Date;

  @IsString({ message: stringValidationMessage })
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

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  final_delivery_bks: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  final_sales: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  expend_cost: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  pre_payment_date: Date;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  pre_payment: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
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

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  revenue: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  balance: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(({ value }) => excelDateToJSDate(value))
  balance_date: Date;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  total_payment: number;

  @IsString({ message: stringValidationMessage })
  notes: string;
}
