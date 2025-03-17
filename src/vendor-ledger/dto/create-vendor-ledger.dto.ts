import { Transform } from 'class-transformer'
import { IsDate, IsInt, IsOptional, IsString } from 'class-validator'
import { transformDate } from 'src/common/utils/date.utils'
import { transformIntegerOrNull } from 'src/common/utils/transform.utils'
import { dateValidationMessage } from 'src/common/validation-message/date-validation-message'
import { integerValidationMessage } from 'src/common/validation-message/integer-validation-message copy'
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy'

export class CreateVendorLedgerDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsString()
  vendor_name: string

  @IsDate()
  @Transform(transformDate)
  order_date: Date

  @IsString()
  author: string

  @IsString()
  processing_company: string

  @IsString()
  order_item: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  base_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  bid_price: number

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  purchase_price: number

  @IsString()
  purchase_rate: string

  @IsInt()
  @Transform(transformIntegerOrNull)
  @Transform(transformIntegerOrNull)
  profit: number

  @IsString()
  profit_rate: string

  @IsString()
  status: string

  @IsDate()
  @Transform(transformDate)
  collection_date: Date

  @IsDate()
  @Transform(transformDate)
  remittance_date: Date

  @IsString()
  invoice: string

  @IsString()
  invoice_recipient: string

  @IsString()
  account_info: string

  @IsString()
  manager: string

  @IsString()
  manager_phone: string
}
