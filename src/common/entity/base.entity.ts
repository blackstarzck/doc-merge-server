import { Column, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '입력타이틀' })
  sheet_name: string

  @Column({ type: 'int', comment: '타이틀별 번호' })
  sheet_data_num: string

  @Column({ type: 'text', comment: '기관명' })
  org_name: string

  @Column({ type: 'boolean', comment: '마감' })
  b_close_date: boolean

  @Column({ type: 'boolean', comment: '계산서' })
  b_invoice: boolean

  @Column({ type: 'text', comment: '낙찰업체' })
  win_company: string

  @Column({ type: 'text', comment: '상위사업자' })
  parent_company: string

  @Column({ type: 'text', comment: '구분' })
  category: string

  @Column({ type: 'text', comment: '특이사항' })
  notes: string

  @Column({ type: 'text', comment: '담당' })
  role_person: string

  @Column({ type: 'date', comment: '발주일' })
  order_date: Date

  @Column({ type: 'date', comment: '납품일' })
  delivery_date: Date

  @Column({ type: 'int', comment: '총권수' })
  total_bks: number

  @Column({ type: 'text', comment: '마크장비' })
  mark_equip: string

  @Column({ type: 'int', comment: '도서정가' })
  bk_price: number

  @Column({ type: 'int', comment: '낙찰금액: floor(bk_price*win_rate)' })
  win_price: number

  @Column({ type: 'float', comment: '낙찰율(%)' })
  win_rate: number

  @Column({ type: 'int', comment: '도서공급단가: floor(bk_price*bk_supply_rate)' })
  bk_supply_price: number

  @Column({ type: 'float', comment: '도서공급율' })
  bk_supply_rate: number

  @Column({ type: 'int', comment: '매입원가: bk_price * bk_cost_late' })
  purchase_cost: number

  @Column({ type: 'float', comment: '도서원가율' })
  bk_cost_late: number

  @Column({ type: 'int', comment: '기관마,장단가(권당)' })
  org_m_per_price: number

  @Column({ type: 'int', comment: '기관마,장비정가: total_bks * org_m_per_price' })
  org_m_price: number

  @Column({ type: 'int', comment: '마장공급단가' })
  m_supply_price: number

  @Column({ type: 'int', comment: '마장공급합가: total_bks * m_supply_price' })
  m_supply_total_price: number

  @Column({ type: 'int', comment: '품절정가(간접할인 등)' })
  out_of_stock_price: number

  @Column({ type: 'int', comment: '품절권수' })
  out_of_stock_bks: number

  @Column({ type: 'int', comment: '최종납품권수: total_bks - out_of_stock_bks' })
  final_delivery_quantity: number

  @Column({ type: 'int', comment: '마장 최종매출액: m_supply_price * m_supply_price' })
  m_final_sales: number

  @Column({ type: 'int', comment: '선입금' })
  payment: number

  @Column({ type: 'date', comment: '선입금일자' })
  pre_payment_date: Date

  @Column({ type: 'int', comment: '잔금' })
  balance: number

  @Column({ type: 'date', comment: '잔금일자' })
  balance_date: Date

  @Column({ type: 'int', comment: '예정잔금: floor(bk_supply_price+m_supply_total_price-pre_payment-balance)' })
  expected_balance: number

  @Column({ type: 'int', comment: '총입금액' })
  total_payment: number

  @Column({ type: 'int', comment: '최종 납품정가: bk_price - out_of_stock_bks' })
  final_delivery_price: number

  @Column({ type: 'int', comment: '최종 도서매출액: bk_supply_rate * m_supply_price' })
  final_bk_sales: number

  @Column({ type: 'int', comment: '도서수익금: final_bk_sales-(m_supply_price*bk_cost_late)' })
  bk_revenue: number
}
