import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { transformDate } from 'src/common/utils/date.utils';
import { transformIntegerOrNull } from 'src/common/utils/transform.utils';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
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

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  shipment_date: Date;

  @IsString({ message: stringValidationMessage })
  progress_person: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  delivery_date: Date;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  commission: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  additional_cost: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  settlement_cost: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  settlement_date: Date;

  @IsString({ message: stringValidationMessage })
  shipping_method: string;

  @IsString({ message: stringValidationMessage })
  tracking_number: string;

  @IsString({ message: stringValidationMessage })
  remarks: string;
}
