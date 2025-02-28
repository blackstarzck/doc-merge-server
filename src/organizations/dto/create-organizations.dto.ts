import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsString, IsNumber, IsDate } from 'class-validator';
import { OrganizationsModel } from '../entity/organizations.entity';
import { stringValidationMessage } from 'src/common/validation-message/string-validation-message copy';

export class CreateDocumentDto extends PartialType(
  OmitType(OrganizationsModel, ['id'] as const),
) {
  @IsOptional()
  @IsString({ message: stringValidationMessage })
  cost_rate?: string;

  @IsOptional()
  @IsString({ message: stringValidationMessage })
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
