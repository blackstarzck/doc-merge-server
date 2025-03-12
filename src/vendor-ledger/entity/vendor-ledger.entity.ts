import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "vendor_ledger_model", comment: "매입처원장" })
export class VendorLedgerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", comment: "매입처" })
  vendor_name: string;

  @Column({ type: "date", comment: "발주일", nullable: true })
  order_date: Date;

  @Column({ type: "text", comment: "작성자" })
  author: string;

  @Column({ type: "text", comment: "진행업체" })
  processing_company: string;

  @Column({ type: "text", comment: "발주건" })
  order_item: string;

  @Column({ type: "float", comment: "기초금액(정가)", nullable: true })
  base_price: number;

  @Column({ type: "float", comment: "낙찰가(공급가)", nullable: true })
  bid_price: number;

  @Column({ type: "float", comment: "매입가", nullable: true })
  purchase_price: number;

  @Column({ type: "text", comment: "매입률(%)" })
  purchase_rate: string;

  @Column({ type: "float", comment: "이익금", nullable: true })
  profit: number;

  @Column({ type: "text", comment: "이익률(%)" })
  profit_rate: string;

  @Column({ type: "text", comment: "현황 (예: 지출 완료, 수금 완료)" })
  status: string;

  @Column({ type: "date", comment: "수금일", nullable: true })
  collection_date: Date;

  @Column({ type: "date", comment: "송금일", nullable: true })
  remittance_date: Date;

  @Column({ type: "text", comment: "계산서" })
  invoice: string;

  @Column({ type: "text", comment: "계산서 수신 사업자" })
  invoice_recipient: string;

  @Column({ type: "text", comment: "계좌정보" })
  account_info: string;

  @Column({ type: "text", comment: "담당자" })
  manager: string;

  @Column({ type: "text", comment: "담당자 전화번호" })
  manager_phone: string;
}
