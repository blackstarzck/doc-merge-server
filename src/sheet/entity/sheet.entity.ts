import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SheetModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', comment: '시트명' })
  name: number;
}
