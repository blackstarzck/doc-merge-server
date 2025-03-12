import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cargo_usage_model" })
export class CargoUsageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", comment: "연번" })
  no: string;

  @Column({ type: "text", comment: "작성자" })
  author: string;

  @Column({ type: "text", comment: "도착지" })
  destination: string;

  @Column({ type: "text", comment: "진행건" })
  progress_item: string;

  @Column({ type: "text", comment: "수량" })
  quantity: string;

  @Column({ type: "date", comment: "발송일자", nullable: true })
  shipment_date: Date;

  @Column({ type: "text", comment: "업체" })
  company: string;

  @Column({ type: "date", comment: "납품일자", nullable: true })
  delivery_date: Date;

  @Column({ type: "float", comment: "요금", nullable: true })
  cost: number;

  @Column({ type: "text", comment: "추가비용" })
  additional_cost: string;

  @Column({ type: "float", comment: "정산비용", nullable: true })
  settlement_cost: number;

  @Column({ type: "date", comment: "정산일자", nullable: true })
  settlement_date: Date;

  @Column({ type: "text", comment: "차량" })
  vehicle: string;

  @Column({ type: "text", comment: "비고" })
  remarks: string;
}
