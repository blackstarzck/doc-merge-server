import { IsOptional, IsInt, IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator'
import { Transform } from 'class-transformer'
import {
  transformIntegerOrNull,
  transformString,
  transformDate
} from 'src/common/utils/transform.utils' // 변환 유틸리티 가정
import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity' // 관계 엔티티 import 가정

export class CreateVendorLedgerDto {
  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  id?: number

  @IsOptional()
  @IsString()
  @Transform(transformString)
  author?: string

  @IsNotEmpty()
  @IsString()
  @Transform(transformString)
  vendor: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vendor_id?: number

  @IsOptional()
  @IsString()
  no?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  order_item?: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  vl_order_date?: Date

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vl_base_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vl_bk_supply_price?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vl_purchase_price?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value) || null) // float 변환
  vl_purchase_rate?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value) || null) // float 변환
  vl_our_revenue_rate?: number

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull) // bigint를 DTO에서는 int로 처리
  vl_our_revenue?: number

  @IsOptional()
  @IsString()
  @Transform(transformString)
  status?: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  collection_date?: Date

  @IsOptional()
  @IsString()
  @Transform(transformString) // 엔티티에서 text로 정의됨
  remittance_date?: string

  @IsOptional()
  @IsDate()
  @Transform(transformDate)
  vl_invoice_date?: Date

  @IsOptional()
  @IsString()
  @Transform(transformString)
  invoice_recipient?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  account_info?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  manager?: string

  @IsOptional()
  @IsString()
  @Transform(transformString)
  manager_phone?: string

  @IsOptional()
  @IsInt()
  @Transform(transformIntegerOrNull)
  vl_row_id?: number

  @IsOptional()
  bookDelivery?: BookDeliveryModel
}
