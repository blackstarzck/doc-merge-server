import { columnBigIntTransformers, columnRateTransformers } from 'src/common/utils/transform.utils'
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'organizations_model' })
export class OrganizationModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    comment: '연도',
    nullable: true,
    transformer: {
      to: (value) => value,
      from: (value) => value ? String(value) : ''
    }
  })
  year: number | null

  @BeforeInsert()
  @BeforeUpdate()
  setYearFromDate() {
    this.year = this.order_date ? new Date(this.order_date).getFullYear() : null;
  }

  @Column({ type: 'int', comment: '연번' })
  no: number

  @Column({ type: 'text', comment: '기관명' })
  org_name: string

  @Column({
    type: 'boolean',
    comment: '마감',
    nullable: true,
    default: false,
    transformer: {
      to: (value) => value,
      from: (value) => (value ? value : false)
    }
  })
  b_close_status: boolean

  @Column({
    type: 'boolean',
    comment: '계산서발행상태',
    nullable: true,
    default: false,
    transformer: {
      to: (value) => value,
      from: (value) => (value ? value : false)
    }
  })
  invoice_received: boolean

  @Column({ type: 'text', comment: '낙찰업체' })
  win_company: string

  @Column({ type: 'text', comment: '상위사업자' })
  parent_company: string

  @Column({ type: 'text', comment: '구분' })
  category: string

  @Column({ type: 'text', comment: '특이사항' })
  notes: string

  @Column({ type: 'text', comment: '진행담당자' })
  role_person: string

  @Column({ type: 'text', comment: '원가율 확정', nullable: true })
  cost_rate: string

  @Column({ type: 'date', comment: '발주일자', nullable: true })
  order_date: Date

  @Column({ type: 'date', comment: '납품일자', nullable: true })
  delivery_date: Date

  @Column({ type: 'float', comment: '총권수', nullable: true })
  total_bks: number

  @Column({ type: 'text', comment: '마크장비' })
  mark_equip: string

  @Column({
    type: 'bigint',
    comment: '도서정가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  bk_price: number

  @Column({ type: 'int', comment: '낙찰금액', nullable: true })
  win_price: number // floor(bk_price * win_rate)

  @Column({
    type: 'float',
    comment: '낙찰율',
    transformer: columnRateTransformers,
    nullable: true
  })
  win_rate: number

  @Column({
    type: 'bigint',
    comment: '도서공급단가',
    transformer: columnBigIntTransformers,
    nullable: true
  })
  bk_supply_price: number // floor(bk_price * bk_supply_rate)

  @Column({
    type: 'float',
    comment: '도서공급율',
    transformer: columnRateTransformers,
    nullable: true
  })
  bk_supply_rate: number

  @Column({ type: 'float', comment: '매입원가', nullable: true })
  purchase_cost: number // bk_price * bk_cost_late

  @Column({
    type: 'float',
    comment: '도서원가율',
    transformer: columnRateTransformers,
    nullable: true
  })
  bk_cost_late: number

  @Column({ type: 'float', comment: '기관마,장단가(권당)', nullable: true })
  org_m_per_price: number

  @Column({ type: 'float', comment: '기관마,장비정가', nullable: true })
  org_m_price: number // total_bks * org_m_per_price

  @Column({ type: 'float', comment: '마장공급단가', nullable: true })
  m_supply_price: number

  @Column({ type: 'float', comment: '마장공급합가', nullable: true })
  m_supply_total_price: number // total_bks * m_supply_price

  @Column({ type: 'float', comment: '품절정가(간접할인 등)', nullable: true })
  out_of_stock_price: number

  @Column({ type: 'float', comment: '품절권수', nullable: true })
  out_of_stock_bks: number

  @Column({ type: 'float', comment: '최종납품권수', nullable: true })
  final_delivery_quantity: number // total_bks - out_of_stock_bks

  @Column({ type: 'float', comment: '마장 최종매출액', nullable: true })
  m_final_sales: number // m_supply_price * m_supply_price

  @Column({ type: 'text', comment: '결제방식', nullable: true })
  payment_method: string

  @Column({ type: 'float', comment: '선입금액', nullable: true })
  pre_payment: number

  @Column({ type: 'date', comment: '선금일자', nullable: true })
  pre_payment_date: Date

  @Column({ type: 'float', comment: '잔금', nullable: true })
  balance: number

  @Column({ type: 'date', comment: '잔금일자', nullable: true })
  balance_date: Date

  @Column({ type: 'float', comment: '예정잔금', nullable: true })
  expected_balance: number // floor(bk_supply_price+m_supply_total_price-pre_payment-balance)

  @Column({ type: 'float', comment: '총입금액', nullable: true })
  total_payment: number

  @Column({ type: 'float', comment: '최종 납품정가', nullable: true })
  final_delivery_price: number // bk_price - out_of_stock_bks

  @Column({ type: 'float', comment: '최종 도서매출액', nullable: true })
  final_bk_sales: number // bk_supply_rate * m_supply_price

  @Column({ type: 'float', comment: '도서수익금', nullable: true })
  bk_revenue: number // final_bk_sales-(m_supply_price*bk_cost_late)

  @Column({ type: 'float', comment: '남은기간', nullable: true })
  d_day: number // d-day(delivery_date-today_date)

  @Column({ type: 'float', comment: '순이익금', nullable: true })
  net_revenue: number

  @Column({ type: 'float', comment: '자사이익율', nullable: true })
  revenue_rate: number

  @Column({ type: 'text', comment: '입력타이틀' })
  sheet_name: string

  @Column({ type: 'float', comment: '타이틀별 번호' })
  sheet_data_num: number
}
