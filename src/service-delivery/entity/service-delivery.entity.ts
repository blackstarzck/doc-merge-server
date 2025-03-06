import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'service_delivery_model' })
export class ServiceDeliveryModel extends BaseModel {
  @Column({ type: 'varchar', comment: '번호', nullable: true })
  no: string;

  @Column({ type: 'date', comment: '날짜', nullable: true })
  date: Date;

  @Column({ type: 'text', comment: '입찰기관', nullable: true })
  bid_org: string;

  @Column({ type: 'text', comment: '낙찰업체', nullable: true })
  win_company: string;

  @Column({ type: 'text', comment: '상위사업자', nullable: true })
  parent_company: string;

  @Column({ type: 'text', comment: '기관명', nullable: true })
  org_name: string;

  @Column({ type: 'text', comment: '진행담당자', nullable: true })
  role_person: string;

  @Column({ type: 'text', comment: '공고번호', nullable: true })
  bid_num: string;

  @Column({ type: 'date', comment: '계약일자', nullable: true })
  contract_date: Date;

  @Column({ type: 'date', comment: '납품일자', nullable: true })
  delivery_date: Date;

  @Column({ type: 'text', comment: '마크장비', nullable: true })
  mark_equip: string;

  @Column({ type: 'float', comment: '기초금액', nullable: true })
  base_price: number;

  @Column({ type: 'float', comment: '낙찰금액', nullable: true })
  win_price: number;

  @Column({ type: 'float', comment: '낙찰율(%)', nullable: true })
  win_rate: number;

  @Column({ type: 'float', comment: '매입원가', nullable: true })
  purchase_cost: number;

  @Column({ type: 'float', comment: '최종납품권수', nullable: true })
  final_delivery_quantity: number;

  @Column({ type: 'float', comment: '최종매출액', nullable: true })
  final_sales: number;

  @Column({ type: 'text', comment: '결제방식', nullable: true })
  payment_method: string;

  @Column({ type: 'date', comment: '선입금일자', nullable: true })
  pre_payment_date: Date;

  @Column({ type: 'float', comment: '선입금', nullable: true })
  pre_payment: number;

  @Column({ type: 'float', comment: '예정잔금', nullable: true })
  expected_balance: number;

  @Column({ type: 'float', comment: '최종 납품정가', nullable: true })
  final_delivery_price: number;

  @Column({ type: 'float', comment: '최종 도서매출액', nullable: true })
  final_bk_sales: number;

  @Column({ type: 'float', comment: '수익금', nullable: true })
  revenue: number;

  @Column({ type: 'float', comment: '순이익금', nullable: true })
  net_revenue: number;

  @Column({ type: 'text', comment: '업체연락처', nullable: true })
  company_contact: string;

  @Column({ type: 'text', comment: '업체담당자', nullable: true })
  company_person: string;

  @Column({ type: 'text', comment: '행정담당자연락처', nullable: true })
  admin_contact: string;

  @Column({ type: 'text', comment: '행정담당자', nullable: true })
  admin_person: string;

  @Column({ type: 'text', comment: '사서 연락처', nullable: true })
  lib_contact: string;

  @Column({ type: 'text', comment: '사서담당자', nullable: true })
  lib_person: string;
}
