import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CargoUseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '연번' })
  no: string;

  @Column({ type: 'text', comment: '작성자' })
  author: string;

  @Column({ type: 'text', comment: '도착지' })
  destination: string;

  @Column({ type: 'text', comment: '진행건' })
  progress_item: string;

  @Column({ type: 'varchar', comment: '수량' })
  quantity: string;

  @Column({ type: 'date', comment: '발송일자' })
  shipment_date: Date;

  @Column({ type: 'text', comment: '업체' })
  company: string;

  @Column({ type: 'date', comment: '납품일자' })
  delivery_date: Date;

  @Column({ type: 'int', comment: '요금', nullable: true })
  cost: number;

  @Column({ type: 'varchar', comment: '추가비용' })
  additional_cost: string;

  @Column({ type: 'int', comment: '정산비용', nullable: true })
  settlement_cost: number;

  @Column({ type: 'date', comment: '정산일자' })
  settlement_date: Date;

  @Column({ type: 'text', comment: '차량' })
  vehicle: string;

  @Column({ type: 'text', comment: '비고' })
  remarks: string;
}
