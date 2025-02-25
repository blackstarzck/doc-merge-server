import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsString, IsNumber, IsDate } from 'class-validator';
import { DocumentsModel } from '../entity/documents.entity';

export class CreateDocumentDto extends PartialType(
  OmitType(DocumentsModel, ['id'] as const),
) {
  @IsOptional()
  @IsString()
  cost_rate?: string;

  @IsOptional()
  @IsString()
  payment_method?: string;

  @IsOptional()
  @IsInt()
  d_day?: number;

  @IsOptional()
  @IsDate()
  today_date?: Date;

  @IsOptional()
  @IsInt()
  net_revenue?: number;

  @IsOptional()
  @IsNumber()
  revenue_rate?: number;
}
