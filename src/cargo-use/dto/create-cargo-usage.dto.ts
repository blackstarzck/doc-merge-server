import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message';
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';
import { transformDate } from 'src/common/utils/date.utils';
import { transformFloat } from 'src/common/utils/transform.utils';

export class CreateCargoUseDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  no: string;

  @IsString({ message: stringValidationMessage })
  author: string;

  @IsString({ message: stringValidationMessage })
  destination: string;

  @IsString({ message: stringValidationMessage })
  progress_item: string;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  quantity: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  shipment_date: Date;

  @IsString({ message: stringValidationMessage })
  company: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  delivery_date: Date;

  @IsNumber()
  @Transform(transformFloat)
  cost: number;

  @IsString({ message: stringValidationMessage })
  @Transform(({ value }) => String(value))
  additional_cost: string;

  @IsNumber()
  @Transform(transformFloat)
  settlement_cost: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  settlement_date: Date;

  @IsString({ message: stringValidationMessage })
  vehicle: string;

  @IsString({ message: stringValidationMessage })
  remarks: string;
}
