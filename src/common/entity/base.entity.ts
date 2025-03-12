import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', comment: '잔금', nullable: true })
  balance: number;

  @Column({ type: 'date', comment: '잔금일자', nullable: true })
  balance_date: Date;

  @Column({ type: 'float', comment: '총입금액', nullable: true })
  total_payment: number;

  @Column({ type: 'text', comment: '특이사항', nullable: true })
  notes: string;
}
