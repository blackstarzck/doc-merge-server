import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { columnBigIntTransformers, columnRateTransformers } from 'src/common/utils/transform.utils'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

@Entity({ name: 'vendor_ledger_model', comment: '매입처 원장' })
export class VendorLedgerModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '작성자', nullable: true })
  author: string

  @Column({ type: 'text', comment: '상위업체' })
  vendor: string

  @Column({ type: 'int', comment: '상위업체 아이디', nullable: true })
  vendor_id: number

  @Column({ type: 'int', comment: '연번', nullable: true })
  no: number

  @Column({ type: 'text', comment: '발주건', nullable: true })
  order_item: string

  @Column({ type: 'date', comment: '발주일자', nullable: true })
  vl_order_date: Date

  @Column({ type: 'int', comment: '기초금액', nullable: true })
  vl_base_price: number

  @Column({ type: 'int', comment: '도서공급단가', nullable: true })
  vl_bk_supply_price: number

  @Column({ type: 'int', comment: '매입가', nullable: true })
  vl_purchase_price: number

  @Column({
    type: 'float',
    comment: '자사매입율',
    transformer: columnRateTransformers,
    nullable: true
  })
  vl_purchase_rate: number

  @Column({
    type: 'float',
    comment: '자사이익율',
    transformer: columnRateTransformers,
    nullable: true
  })
  vl_our_revenue_rate: number

  @Column({
    type: 'bigint',
    comment: '자사이익금',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  vl_our_revenue: number

  @Column({ type: 'text', comment: '현황', nullable: true })
  status: string

  @Column({ type: 'date', comment: '수금일', nullable: true })
  collection_date: Date

  @Column({ type: 'text', comment: '송금일', nullable: true })
  remittance_date: string

  @Column({ type: 'date', comment: '계산서발행일', nullable: true })
  vl_invoice_date: Date

  @Column({ type: 'text', comment: '계산서 수신 사업자', nullable: true })
  invoice_recipient: string

  @Column({ type: 'text', comment: '계좌정보', nullable: true })
  account_info: string

  @Column({ type: 'text', comment: '담당자', nullable: true })
  manager: string

  @Column({ type: 'text', comment: '담당자 전화번호', nullable: true })
  manager_phone: string

  @Column({ type: 'int', comment: '도서납품현황 행 아이디', nullable: true })
  bd_row_id: number

  @OneToOne(() => BookDeliveryModel, (book_delivery) => book_delivery.vendor_ledger)
  book_delivery: BookDeliveryModel
}
