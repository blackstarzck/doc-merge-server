import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'mark_status_model', comment: '마크장비 납품 현황' })
export class MarkStatusModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '마크팀', nullable: true })
  mark_client: string

  @Column({ type: 'int', comment: '마크팀 아이디', nullable: true })
  mark_client_id: number

  @Column({ type: 'int', comment: '연번', nullable: true })
  no: number

  @Column({ type: 'date', comment: '기재일', nullable: true })
  entry_date: Date

  @Column({ type: 'text', comment: '장비' })
  equipment: string

  @Column({ type: 'text', comment: '구분' })
  category: string

  @Column({ type: 'text', comment: '완료월' })
  completion_month: string

  @Column({ type: 'text', comment: '납품지역', nullable: true })
  region: string

  @Column({ type: 'text', comment: '납품처' })
  destination: string

  @Column({ type: 'text', comment: '계약업체' })
  contracted_company: string

  @Column({ type: 'int', comment: '수량', nullable: true })
  quantity: number

  @Column({ type: 'int', comment: '최종정산수량', nullable: true })
  final_settlement_quantity: number

  @Column({ type: 'int', comment: '정산금액', nullable: true })
  settlement_amount: number

  @Column({ type: 'text', comment: '정산월' })
  settlement_month: string

  @Column({ type: 'int', comment: '매출액', nullable: true })
  sales_amount: number

  @Column({ type: 'date', comment: '입금일', nullable: true })
  deposit_date: Date

  @Column({ type: 'text', comment: '발주' })
  order: string

  @Column({ type: 'date', comment: '납품기한', nullable: true })
  delivery_deadline: Date

  @Column({ type: 'text', comment: '(마크장비)비고' })
  notes: string

  @Column({ type: 'date', comment: '(마크장비)목록전달', nullable: true })
  list_delivery: Date

  @Column({ type: 'date', comment: '(마크장비)규격(IP 전달)', nullable: true })
  ip_delivery: Date

  @Column({ type: 'date', comment: '(마크장비)마크요청', nullable: true })
  mark_request: Date

  @Column({ type: 'date', comment: '(마크장비)마크완료', nullable: true })
  mark_completion: Date

  @Column({ type: 'date', comment: '(마크장비)품절전달', nullable: true })
  out_of_stock: Date

  @Column({ type: 'date', comment: '(마크장비)장비 시작', nullable: true })
  equipment_start: Date

  @Column({ type: 'int', comment: '(마크장비)투입인원수', nullable: true })
  personnel_count: number

  @Column({ type: 'date', comment: '(마크장비)장비 완료', nullable: true })
  completion: Date

  @Column({ type: 'text', comment: '(마크장비)품절처리' })
  out_of_stock_status: string

  @Column({ type: 'text', comment: '(도서관 담당자)연락처/이메일', nullable: true })
  contact: string

  @Column({ type: 'text', comment: '(도서관 담당자)담당자', nullable: true })
  manager: string
}
