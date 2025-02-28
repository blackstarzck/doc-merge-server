import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class BookDisposalModel extends BaseModel {
  @Column({ type: 'int', comment: '번호', nullable: true })
  no: number;

  @Column({ type: 'date', comment: '날짜', nullable: true })
  date: Date;

  @Column({ type: 'text', comment: '낙찰업체', nullable: true })
  win_company: string;

  @Column({ type: 'text', comment: '상위사업자', nullable: true })
  parent_company: string;

  @Column({ type: 'text', comment: '구분', nullable: true })
  category: string;

  @Column({ type: 'text', comment: '기관명', nullable: true })
  org_name: string;

  @Column({ type: 'text', comment: '진행', nullable: true })
  status: string;

  @Column({ type: 'text', comment: '비용', nullable: true })
  cost: string;

  @Column({ type: 'text', comment: '진행담당자', nullable: true })
  role_person: string;

  @Column({ type: 'text', comment: '마크장비', nullable: true })
  mark_equip: string;

  @Column({ type: 'int', comment: '최종납품권수', nullable: true })
  final_delivery_bks: number;

  @Column({ type: 'int', comment: '최종매출액', nullable: true })
  final_sales: number;

  @Column({ type: 'int', comment: '지출비용', nullable: true })
  expend_cost: number;

  @Column({ type: 'date', comment: '선입금일자', nullable: true })
  pre_payment_date: Date;

  @Column({ type: 'int', comment: '선입금', nullable: true })
  pre_payment: number;

  @Column({ type: 'int', comment: '예정잔금', nullable: true })
  expected_balance: number;

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
