import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookDeliveryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", comment: "매입처", nullable: true })
  vender_name: string;

  @Column({ type: "date", comment: "발주일", nullable: true })
  order_date: Date;

  @Column({ type: "varchar", comment: "작성자", nullable: true })
  author: string;

  @Column({ type: "varchar", comment: "진행업체", nullable: true })
  processing_company: string;

  @Column({ type: "varchar", comment: "발주건", nullable: true })
  order_item: string;

  @Column({ type: "float", comment: "기초금액(정가)", nullable: true })
  base_price: number;

  @Column({ type: "float", comment: "낙찰가(공급가)", nullable: true })
  bid_price: number;

  @Column({ type: "float", comment: "매입가", nullable: true })
  purchase_price: number;

  @Column({ type: "float", comment: "매입률(%)", nullable: true })
  purchase_rate: number;

  @Column({ type: "float", comment: "이익금", nullable: true })
  profit: number;

  @Column({ type: "float", comment: "이익률(%)", nullable: true })
  profit_rate: number;

  @Column({ type: "varchar", comment: "현황 (예: 지출 완료, 수금 완료)", nullable: true })
  status: string;

  @Column({ type: "date", comment: "수금일", nullable: true })
  collection_date: Date;

  @Column({ type: "date", comment: "송금일", nullable: true })
  remittance_date: Date;

  @Column({ type: "varchar", comment: "계산서 (파일 경로 또는 텍스트)", nullable: true })
  invoice: string;

  @Column({ type: "varchar", comment: "계산서 수신 사업자", nullable: true })
  invoice_recipient: string;

  @Column({ type: "varchar", comment: "계좌정보", nullable: true })
  account_info: string;

  @Column({ type: "varchar", comment: "담당자", nullable: true })
  manager: string;

  @Column({ type: "varchar", comment: "담당자 전화번호", nullable: true })
  manager_phone: string;
}
