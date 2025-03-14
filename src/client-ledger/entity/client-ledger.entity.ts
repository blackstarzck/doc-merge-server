import { columnRateTransformers } from "src/common/utils/transform.utils";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "client_ledger_model", comment: "매출처 원장" })
export class ClientLedgerModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", comment: "연번", nullable: true })
  no: string;

  @Column({ type: "text", comment: "내역", nullable: true })
  details: string;

  @Column({ type: "text", comment: "발주상태", nullable: true })
  order_status: string;

  @Column({ type: "date", comment: "발주일자", nullable: true })
  order_date: Date;

  @Column({ type: "text", comment: "입금상태", nullable: true })
  deposit_status: string;

  @Column({ type: "date", comment: "입금일자", nullable: true })
  deposit_date: Date;

  @Column({ type: "text", comment: "선금상태", nullable: true })
  pre_payment_status: string;

  @Column({ type: "date", comment: "선금날짜", nullable: true })
  pre_payment_date: Date;

  @Column({ type: "int", comment: "도서정가", nullable: true })
  book_price: number;

  @Column({
    type: "float",
    comment: "공급율",
    transformer: columnRateTransformers,
    nullable: true,
  })
  supply_rate: number;

  @Column({ type: "int", comment: "공급가", nullable: true })
  supply_price: number;

  @Column({ type: "int", comment: " 입금액", nullable: true })
  amount: number;

  @Column({ type: "float", comment: "매입율", transformer: columnRateTransformers, nullable: true })
  purchase_rate: number;

  @Column({ type: "int", comment: "매입액", nullable: true })
  purchase_amount: number;

  @Column({ type: "float", comment: "이익율", transformer: columnRateTransformers, nullable: true })
  profit_rate: number;

  @Column({ type: "int", comment: "이익금", nullable: true })
  profit: number;

  @Column({ type: "int", comment: "잔액", nullable: true })
  balance: number;

  @Column({ type: "date", comment: "계산서발행일", nullable: true })
  invoice_date: Date;

  @Column({ type: "text", comment: "비고", nullable: true })
  remarks: string;
}
