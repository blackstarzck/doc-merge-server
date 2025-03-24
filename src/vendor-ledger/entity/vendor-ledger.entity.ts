import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { columnRateTransformers } from 'src/common/utils/transform.utils'
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'

@Entity({ name: 'vendor_ledger_model', comment: '매입처 원장' })
export class VendorLedgerModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date', comment: '발주일', nullable: true })
  order_date: Date

  @Column({ type: 'text', comment: '작성자', nullable: true })
  author: string

  @Column({ type: 'text', comment: '상위사업자', nullable: true })
  contractor: string

  @Column({ type: 'text', comment: '매입처', nullable: true })
  vendor: string

  @Column({ type: 'int', comment: '매입처', nullable: true })
  vendor_id: number

  @Column({ type: 'text', comment: '발주건', nullable: true })
  order_item: string

  @Column({ type: 'int', comment: '기초금액', nullable: true })
  base_price: number

  @Column({ type: 'int', comment: '도서공급단가', nullable: true })
  bk_supply_price: number

  @Column({ type: 'int', comment: '매입가', nullable: true })
  purchase_price: number

  @Column({
    type: 'float',
    comment: '자사매입율',
    transformer: columnRateTransformers,
    nullable: true
  })
  purchase_rate: number

  @Column({ type: 'int', comment: '이익금', nullable: true })
  our_revenue: number

  @Column({
    type: 'float',
    comment: '자사이익률',
    transformer: columnRateTransformers,
    nullable: true
  })
  our_revenue_rate: number

  @Column({ type: 'text', comment: '현황', nullable: true })
  status: string

  @Column({ type: 'date', comment: '수금일', nullable: true })
  collection_date: Date

  @Column({ type: 'date', comment: '송금일', nullable: true })
  remittance_date: Date

  @Column({ type: 'text', comment: '계산서발행일', nullable: true })
  invoice_date: Date

  @Column({ type: 'text', comment: '계산서 수신 사업자', nullable: true })
  invoice_recipient: string

  @Column({ type: 'text', comment: '계좌정보', nullable: true })
  account_info: string

  @Column({ type: 'text', comment: '담당자', nullable: true })
  manager: string

  @Column({ type: 'text', comment: '담당자 전화번호', nullable: true })
  manager_phone: string

  @Column({ type: 'int', comment: '매입업체 행 아이디', nullable: true, unique: true })
  vl_row_id: number

  @OneToOne(() => BookDeliveryModel, (bookDelivery) => bookDelivery.vendor_ledger)
  bookDelivery: BookDeliveryModel
}
