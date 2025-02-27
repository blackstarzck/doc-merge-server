import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsInt, IsString, IsNumber, IsDate } from 'class-validator';
import { BookDeliveryModel } from '../entity/book-delivery.entity';

export class CreateBookDeliveryDto extends PartialType(
  OmitType(BookDeliveryModel, ['id'] as const),
) {}
