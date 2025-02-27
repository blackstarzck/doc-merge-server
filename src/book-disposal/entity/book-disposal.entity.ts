import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BookDisposalModel extends BaseModel {
  @Column({ type: 'int', comment: '번호' })
  no: string;

  @Column({ type: 'date', comment: '날짜' })
  date: string;

  @Column({ type: 'text', comment: '낙찰업체' })
  win_company: string;

  @Column({ type: 'text', comment: '상위사업자' })
  parent_company: string;

  @Column({ type: 'text', comment: '구분' })
  category: string;

  @Column({ type: 'text', comment: '기관명' })
  org_name: string;

  @Column({ type: 'text', comment: '진행' })
  status: string;

  @Column({ type: 'text', comment: '비용' })
  cost: string;

  @Column({ type: 'text', comment: '진행담당자' })
  role_person: string;

  @Column({ type: 'text', comment: '마크장비' })
  mark_equip: string;

  @Column({ type: 'int', comment: '최종납품권수' })
  final_delivery_bks: string;

  @Column({ type: 'int', comment: '최종매출액' })
  final_sales: string;

  @Column({ type: 'int', comment: '지출비용' })
  expend_cost: string;

  @Column({ type: 'date', comment: '선입금일자' })
  pre_payment_date: string;

  @Column({ type: 'int', comment: '선입금' })
  pre_payment: string;

  @Column({ type: 'int', comment: '예정잔금' })
  expected_balance: string;

  @Column({ type: 'text', comment: '업체연락처' })
  company_contact: string;

  @Column({ type: 'text', comment: '업체담당자' })
  company_person: string;

  @Column({ type: 'text', comment: '행정담당자연락처' })
  admin_contact: string;

  @Column({ type: 'text', comment: '행정담당자' })
  admin_person: string;

  @Column({ type: 'text', comment: '사서 연락처' })
  lib_contact: string;

  @Column({ type: 'text', comment: '사서담당자' })
  lib_person: string;
}
