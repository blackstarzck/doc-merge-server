import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "logistics_job_model", comment: "물류알바(대전, 창원, 대전)" })
export class LogisticsJobModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", comment: "연번" })
  no: string;

  @Column({ type: "text", comment: "작성자" })
  author: string;

  @Column({ type: "text", comment: "진행건" })
  progress_item: string;

  @Column({ type: "text", comment: "수량" })
  quantity: string;

  @Column({ type: "date", comment: "발송일자", nullable: true })
  shipment_date: Date;

  @Column({ type: "text", comment: "진행인원" })
  progress_person: string;

  @Column({ type: "date", comment: "납품일자", nullable: true })
  delivery_date: Date;

  @Column({ type: "int", comment: "수수료", nullable: true })
  commission: number;

  @Column({ type: "int", comment: "추가비용", nullable: true })
  additional_cost: number;

  @Column({ type: "int", comment: "정산비용", nullable: true })
  settlement_cost: number;

  @Column({ type: "date", comment: "정산일자", nullable: true })
  settlement_date: Date;

  @Column({ type: "text", comment: "발송방법" })
  shipping_method: string;

  @Column({ type: "text", comment: "송장번호", nullable: true })
  tracking_number: string;

  @Column({ type: "text", comment: "비고" })
  remarks: string;
}
