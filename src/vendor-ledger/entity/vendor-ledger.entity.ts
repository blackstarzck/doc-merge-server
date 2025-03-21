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

  @Column({ type: 'text', comment: '진행업체', nullable: true })
  parent_company: string

  @Column({ type: 'text', comment: '발주건', nullable: true })
  order_item: string

  @Column({ type: 'int', comment: '기초금액', nullable: true })
  base_price: number

  @Column({ type: 'int', comment: '낙찰가(공급가)', nullable: true })
  bid_price: number

  @Column({ type: 'int', comment: '매입가', nullable: true })
  purchase_price: number

  @Column({
    type: 'float',
    comment: '매입률(%)',
    transformer: columnRateTransformers,
    nullable: true
  })
  purchase_rate: number

  @Column({ type: 'int', comment: '이익금', nullable: true })
  profit: number

  @Column({
    type: 'float',
    comment: '이익률(%)',
    transformer: columnRateTransformers,
    nullable: true
  })
  profit_rate: number

  @Column({ type: 'text', comment: '현황', nullable: true })
  status: string

  @Column({ type: 'date', comment: '수금일', nullable: true })
  collection_date: Date

  @Column({ type: 'date', comment: '송금일', nullable: true })
  remittance_date: Date

  @Column({ type: 'text', comment: '계산서', nullable: true })
  invoice_received_date: Date

  @Column({ type: 'text', comment: '계산서 수신 사업자', nullable: true })
  invoice_recipient: string

  @Column({ type: 'text', comment: '계좌정보', nullable: true })
  account_info: string

  @Column({ type: 'text', comment: '담당자', nullable: true })
  manager: string

  @Column({ type: 'text', comment: '담당자 전화번호', nullable: true })
  manager_phone: string

  @Column({ type: 'text', comment: '매입처', default: '없음' })
  outsourcing_company: string

  @Column({ type: 'int', comment: '외주업체 아이디', nullable: true })
  outsourcing_company_id: number

  @OneToOne(() => BookDeliveryModel, (bookDelivery) => bookDelivery.vendor_ledger)
  bookDelivery: BookDeliveryModel
}
