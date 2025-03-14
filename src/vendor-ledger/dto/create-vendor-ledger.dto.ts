import { Transform } from "class-transformer";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { transformDate } from "src/common/utils/date.utils";
import { transformIntegerOrNull } from "src/common/utils/transform.utils";
import { dateValidationMessage } from "src/common/validation-message/date-validation-message";
import { integerValidationMessage } from "src/common/validation-message/integer-validation-message copy";
import { stringValidationMessage } from "src/common/validation-message/string-validation-message copy";

export class CreateVendorLedgerDto {
  @IsOptional()
  @IsInt({ message: integerValidationMessage })
  id?: number;

  @IsString({ message: stringValidationMessage })
  vendor_name: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  order_date: Date;

  @IsString({ message: stringValidationMessage })
  author: string;

  @IsString({ message: stringValidationMessage })
  processing_company: string;

  @IsString({ message: stringValidationMessage })
  order_item: string;

  @IsInt()
  @Transform(transformIntegerOrNull)
  base_price: number;

  @IsInt()
  @Transform(transformIntegerOrNull)
  bid_price: number;

  @IsInt()
  @Transform(transformIntegerOrNull)
  purchase_price: number;

  @IsString({ message: stringValidationMessage })
  purchase_rate: string;

  @IsInt()
  @Transform(transformIntegerOrNull)
  profit: number;

  @IsString({ message: stringValidationMessage })
  profit_rate: string;

  @IsString({ message: stringValidationMessage })
  status: string;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  collection_date: Date;

  @IsDate({ message: dateValidationMessage })
  @Transform(transformDate)
  remittance_date: Date;

  @IsString({ message: stringValidationMessage })
  invoice: string;

  @IsString({ message: stringValidationMessage })
  invoice_recipient: string;

  @IsString({ message: stringValidationMessage })
  account_info: string;

  @IsString({ message: stringValidationMessage })
  manager: string;

  @IsString({ message: stringValidationMessage })
  manager_phone: string;
}
