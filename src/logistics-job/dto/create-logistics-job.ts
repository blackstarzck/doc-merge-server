import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { excelDateToJSDate } from 'src/common/utils/date.utils';
import { transformEmptyToNull } from 'src/common/utils/transform.utils';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';

export class CreaeteLogisticsJobDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  no: string;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  author: string;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  progress_item: string;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  quantity: string;

  @Transform(({ value }) => excelDateToJSDate(value))
  shipment_date: Date;

  @IsString({ message: stringValidationMessage })
  progress_person: string;

  @Transform(({ value }) => excelDateToJSDate(value))
  delivery_date: Date;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  commission: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  additional_cost: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformEmptyToNull)
  settlement_cost: number;

  @Transform(({ value }) => excelDateToJSDate(value))
  settlement_date: Date;

  @IsString({ message: stringValidationMessage })
  shipping_method: string;

  @IsString({ message: stringValidationMessage })
  tracking_number: string;

  @IsString({ message: stringValidationMessage })
  remarks: string;
}
