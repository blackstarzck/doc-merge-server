import { columnBigIntTransformers, columnRateTransformers } from 'src/common/utils/transform.utils'
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ClientLedgerModel } from 'src/client-ledger/entity/client-ledger.entity'
import { VendorLedgerModel } from 'src/vendor-ledger/entity/vendor-ledger.entity'

@Entity({ name: 'book_delivery_model' })
export class BookDeliveryModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '연번', unique: true })
  no: string

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

  @Column({ type: 'text', comment: '날짜', nullable: true })
  continue_type: string

  @Column({ type: 'text', comment: '입찰기관' })
  bid_org: string

  @Column({ type: 'text', comment: '매출사업자' })
  sales_company: string

  @Column({ type: 'text', comment: '낙찰업체' })
  win_company: string

  @Column({ type: 'text', comment: '상위사업자' })
  parent_company: string

  @Column({ type: 'int', comment: '상위사업자 아이디', nullable: true })
  parent_company_id: number

  @Column({ type: 'text', comment: '기관명' })
  org_name: string

  @Column({ type: 'text', comment: '매입가 확정' })
  purchase_price: string

  @Column({ type: 'text', comment: '마크장비' })
  mark_equip: string

  @Column({ type: 'text', comment: '대체여부' })
  sub_status: string

  @Column({ type: 'text', comment: '특이사항', nullable: true })
  notes: string

  @Column({ type: 'text', comment: '외주업체', default: '없음' })
  outsourcing_company: string

  @Column({ type: 'int', comment: '외주업체 아이디', nullable: true })
  outsourcing_company_id: number

  @Column({ type: 'text', comment: '진행담당자' })
  role_person: string

  @Column({ type: 'text', comment: '공고번호' })
  bid_number: string

  @Column({ type: 'date', comment: '계약일자', nullable: true })
  contract_date: Date

  @Column({ type: 'date', comment: '납품기한', nullable: true })
  delivery_deadline: Date

  @Column({ type: 'int', comment: '총권수', nullable: true })
  total_bks: number

  @Column({ type: 'int', comment: '낙찰금액', nullable: true })
  win_price: number

  @Column({ type: 'float', comment: '낙찰율', transformer: columnRateTransformers, nullable: true })
  win_rate: number

  @Column({
    type: 'float',
    comment: '도서원가율',
    transformer: columnRateTransformers,
    nullable: true
  })
  bk_cost_rate: number

  @Column({ type: 'int', comment: '업체이익금', nullable: true })
  company_revenue: number

  @Column({
    type: 'float',
    comment: '업체이익율',
    transformer: columnRateTransformers,
    nullable: true
  })
  company_revenue_rate: number

  @Column({ type: 'int', comment: '기관마,장단가', nullable: true })
  org_m_price: number

  @Column({ type: 'int', comment: '기관마,장비납품가', nullable: true })
  org_m_equip_price: number

  @Column({ type: 'int', comment: '마장공급단가', nullable: true })
  m_supply_price: number

  @Column({ type: 'int', comment: '마장공급합가', nullable: true })
  m_supply_total_price: number

  @Column({ type: 'int', comment: '품절정가(간접할인 등)', nullable: true })
  out_of_stock_price: number

  @Column({ type: 'int', comment: '품절권수', nullable: true })
  out_of_stock_bks: number

  @Column({ type: 'int', comment: '최종납품권수', nullable: true })
  final_delivery_bks: number

  @Column({ type: 'int', comment: '마장 최종매출액', nullable: true })
  m_final_sales: number

  @Column({ type: 'int', comment: '선입금액', nullable: true })
  pre_payment: number

  @Column({ type: 'int', comment: '잔금', nullable: true })
  balance: number

  @Column({ type: 'date', comment: '잔금일자', nullable: true })
  balance_date: Date

  @Column({ type: 'int', comment: '최종납품정가', nullable: true })
  final_delivery_price: number

  @Column({ type: 'int', comment: '최종도서매출액', nullable: true })
  final_bk_sales: number

  @Column({ type: 'text', comment: '행정담당자연락처' })
  admin_contact: string

  @Column({ type: 'text', comment: '사서연락처' })
  lib_contact: string

  @Column({ type: 'int', comment: '기간', nullable: true })
  d_day: number

  @Column({ type: 'date', comment: '오늘날짜', nullable: true })
  today_date: Date

  @Column({ type: 'int', comment: '매출업체', nullable: true })
  cl_row_id: number

  @Column({ type: 'int', comment: '매입업체 행 아이디', nullable: true })
  vl_row_id: number

  @OneToOne(() => VendorLedgerModel, (vendor_ledger) => vendor_ledger.bookDelivery)
  @JoinColumn({ name: 'vl_row_id' }) // vendor_ledger_model 테이블의 id 와 연결
  vendor_ledger: VendorLedgerModel

  @OneToOne(() => ClientLedgerModel, (client_ledger) => client_ledger.bookDelivery)
  @JoinColumn({ name: 'cl_row_id' }) // client_ledger_model 테이블의 id 와 연결
  client_ledger: ClientLedgerModel
}
