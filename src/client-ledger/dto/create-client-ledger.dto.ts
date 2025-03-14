import { IsString, IsInt, IsDate, IsOptional, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
import { transformDate } from "src/common/utils/date.utils";
import { transformFloat, transformIntegerOrNull } from "src/common/utils/transform.utils";
import { dateValidationMessage } from "src/common/validation-message/date-validation-message";
import { integerValidationMessage } from "src/common/validation-message/integer-validation-message copy";
import { stringValidationMessage } from "src/common/validation-message/string-validation-message copy";

export class CreateClientLedgerDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsString({ message: stringValidationMessage })
  no: string;

  @IsString({ message: stringValidationMessage })
  details: string;

  @IsString({ message: stringValidationMessage })
  order_status: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  order_date: Date;

  @IsString({ message: stringValidationMessage })
  deposit_status: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  deposit_date: Date;

  @IsString({ message: stringValidationMessage })
  pre_payment_status: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  pre_payment_date: Date;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  book_price: number;

  @IsNumber()
  @Transform(transformFloat)
  supply_rate: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  supply_price: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  amount: number;

  @IsNumber()
  @Transform(transformFloat)
  purchase_rate: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  purchase_amount: number;

  @IsNumber()
  @Transform(transformFloat)
  profit_rate: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  profit: number;

  @IsInt({ message: integerValidationMessage })
  @Transform(transformIntegerOrNull)
  balance: number;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  invoice_date: Date;

  @IsString({ message: stringValidationMessage })
  remarks: string;
}
