import { Transform } from 'class-transformer';
import { excelDateToJSDate } from 'src/utils/date.utils';
import { transformEmptyToNull } from 'src/utils/transform.utils';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', comment: '잔금', nullable: true })
  @Transform(transformEmptyToNull)
  balance: number;

  @Column({ type: 'date', comment: '잔금일자', nullable: true })
  @Transform(({ value }) => excelDateToJSDate(value))
  balance_date: Date;

  @Column({ type: 'float', comment: '총입금액', nullable: true })
  @Transform(transformEmptyToNull)
  total_payment: number;

  @Column({ type: 'text', comment: '특이사항', nullable: true })
  @Transform(transformEmptyToNull)
  notes: string;
}
