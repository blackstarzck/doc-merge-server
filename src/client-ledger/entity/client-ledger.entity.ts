import { BookDeliveryModel } from 'src/book-delivery/entity/book-delivery.entity'
import { columnBigIntTransformers, columnRateTransformers } from 'src/common/utils/transform.utils'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'client_ledger_model', comment: '매출처 원장' })
export class ClientLedgerModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '매출처 이름' })
  client: string

  @Column({ type: 'int', comment: '매출처 아이디', nullable: true }) // 위즈덤셀러, 북차카 등 자사 계열사정보는 없음
  client_id: number

  @Column({ type: 'text', comment: '연번', nullable: true }) // 위즈덤셀러, 북차카 등 자사 계열사정보는 없음
  no: string

  @Column({ type: 'text', comment: '내역', nullable: true })
  details: string

  @Column({ type: 'text', comment: '발주상태', nullable: true })
  order_status: string

  @Column({ type: 'date', comment: '발주일자', nullable: true })
  cl_order_date: Date

  @Column({ type: 'text', comment: '입금상태', nullable: true })
  deposit_status: string

  @Column({ type: 'date', comment: '입금일자', nullable: true })
  deposit_date: Date

  @Column({ type: 'text', comment: '선금상태', nullable: true })
  pre_payment_status: string

  @Column({ type: 'date', comment: '선금일자', nullable: true })
  cl_pre_payment_date: Date

  @Column({
    type: 'bigint',
    comment: '도서정가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  cl_bk_price: number

  @Column({
    type: 'int',
    comment: '도서공급단가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  cl_bk_supply_price: number

  @Column({
    type: 'float',
    comment: '도서공급율',
    transformer: columnRateTransformers,
    nullable: true
  })
  cl_bk_supply_rate: number

  @Column({
    type: 'bigint',
    comment: '도서공급단가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  bk_supply_price: number

  @Column({
    type: 'bigint',
    comment: '총입금액',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  cl_total_payment: number

  @Column({
    type: 'float',
    comment: '자사매입율',
    transformer: columnRateTransformers,
    nullable: true
  })
  cl_purchase_rate: number

  @Column({
    type: 'bigint',
    comment: '매입가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  cl_purchase_price: number

  @Column({
    type: 'float',
    comment: '자사이익율',
    transformer: columnRateTransformers,
    nullable: true
  })
  cl_our_revenue_rate: number

  @Column({
    type: 'bigint',
    comment: '자사이익금',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  cl_our_revenue: number

  @Column({
    type: 'bigint',
    comment: '잔액',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  expected_balance: number

  @Column({ type: 'date', comment: '계산서발행일', nullable: true })
  cl_invoice_date: Date

  @Column({ type: 'text', comment: '비고', nullable: true })
  remarks: string

  @Column({ type: 'int', comment: '매출업체 행 아이디', nullable: true, unique: true })
  cl_row_id: number

  @OneToOne(() => BookDeliveryModel, (bookDelivery) => bookDelivery.client_ledger)
  bookDelivery: BookDeliveryModel
}
