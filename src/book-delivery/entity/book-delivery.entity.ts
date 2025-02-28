import { transformEmptyToNull } from 'src/common/utils/transform.utils';
import { BaseModel } from '../../common/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { Transform } from 'class-transformer';
import { excelDateToJSDate } from 'src/common/utils/date.utils';

@Entity()
export class BookDeliveryModel extends BaseModel {
  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '연번', nullable: true })
  no: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'boolean', comment: '마감유부', nullable: true })
  b_close_status: boolean;

  @Transform(transformEmptyToNull)
  @Column({ type: 'boolean', comment: '계산서발행유무', nullable: true })
  b_invoice: boolean;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '날짜', nullable: true })
  continue_type: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '입찰기관', nullable: true })
  bid_org: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '매출사업자', nullable: true })
  sales_company: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '낙찰업체', nullable: true })
  win_company: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '상위사업자', nullable: true })
  parent_company: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '기관명', nullable: true })
  org_name: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '매입가 확정', nullable: true })
  purchase_price: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '마크장비', nullable: true })
  mark_equip: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '대체여부', nullable: true })
  sub_status: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '외주업체', nullable: true })
  outsourcing_company: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '진행담당자', nullable: true })
  role_person: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '공고번호', nullable: true })
  bid_number: string;

  @Transform(({ value }) => excelDateToJSDate(value))
  @Column({ type: 'date', comment: '계약일자', nullable: true })
  contract_date: Date;

  @Transform(({ value }) => excelDateToJSDate(value))
  @Column({ type: 'date', comment: '발주일자', nullable: true })
  order_date: Date;

  @Transform(({ value }) => excelDateToJSDate(value))
  @Column({ type: 'date', comment: '납품기한', nullable: true })
  delivery_deadline: Date;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '총권수', nullable: true })
  total_bks: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '기초금액', nullable: true })
  base_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '낙찰금액', nullable: true })
  win_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '낙찰율', nullable: true })
  win_rate: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '도서정가', nullable: true })
  bk_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '도서공급단가', nullable: true })
  bk_supply_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '도서공급율', nullable: true })
  bk_supply_rate: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '도서원가율', nullable: true })
  bk_cost_rate: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '업체이익금', nullable: true })
  company_revenue: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '업체이익율', nullable: true })
  company_revenue_rate: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '자사이익률', nullable: true })
  our_revenue_rate: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '기관마,장단가', nullable: true })
  org_m_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '기관마,장비납품가', nullable: true })
  org_m_equip_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '마장공급단가', nullable: true })
  m_supply_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '마장공급합가', nullable: true })
  m_supply_total_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '품절정가(간접할인 등)', nullable: true })
  out_of_stock_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '품절권수', nullable: true })
  out_of_stock_bks: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '최종납품권수', nullable: true })
  final_delivery_bks: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '마장 최종매출액', nullable: true })
  m_final_sales: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '선입금', nullable: true })
  pre_payment: number;

  @Transform(({ value }) => excelDateToJSDate(value))
  @Column({ type: 'date', comment: '선입금일자', nullable: true })
  pre_payment_date: Date;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '예정잔금', nullable: true })
  expected_balance: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '최종납품정가', nullable: true })
  final_delivery_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '최종도서매출액', nullable: true })
  final_bk_sales: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '자사수익금', nullable: true })
  our_revenue: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '행정담당자연락처', nullable: true })
  admin_contact: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'text', comment: '사서연락처', nullable: true })
  lib_contact: string;

  @Transform(({ obj }) => {
    if (!obj.d_day || !obj.delivery_deadline || !obj.today_date) return null;

    const deliveryDate = excelDateToJSDate(obj.delivery_date).getTime();
    const todayDate = excelDateToJSDate(obj.today_date).getTime();

    return (
      obj.d_day ??
      Math.floor((deliveryDate - todayDate) / (1000 * 60 * 60 * 24))
    ); // 일(day) 단위 차이
  })
  @Column({ type: 'float', comment: '기간', nullable: true })
  d_day: number;

  @Transform(({ value }) => excelDateToJSDate(value))
  @Column({ type: 'date', comment: '오늘날짜', nullable: true })
  today_date: Date;
}
