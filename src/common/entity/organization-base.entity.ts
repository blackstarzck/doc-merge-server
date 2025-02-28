import { Transform } from 'class-transformer';
import { excelDateToJSDate } from 'src/common/utils/date.utils';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

const transformEmptyToNull = ({ value }) => (value === '' ? null : value);

const multiply = (a?: number | null, b?: number | null): number | null =>
  a != null && b != null ? a * b : null;

const subtract = (a?: number | null, b?: number | null): number | null =>
  a != null ? (b != null ? a - b : a) : null;

const safeFloor = (value?: number | null): number | null =>
  value != null ? Math.floor(value) : null;

const add = (a?: number | null, b?: number | null): number | null =>
  a != null && b != null ? a + b : (a ?? b ?? null);

export abstract class OrganizationBaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '입력타이틀 번호', nullable: true })
  row_num: number;

  @Column({ type: 'text', comment: '기관명' })
  org_name: string;

  @Column({ type: 'boolean', comment: '마감' })
  b_close_date: boolean;

  @Column({ type: 'boolean', comment: '계산서' })
  b_invoice: boolean;

  @Column({ type: 'text', comment: '낙찰업체' })
  win_company: string;

  @Column({ type: 'text', comment: '상위사업자' })
  parent_company: string;

  @Column({ type: 'text', comment: '구분' })
  category: string;

  @Column({ type: 'text', comment: '특이사항' })
  notes: string;

  @Column({ type: 'text', comment: '담당' })
  role_person: string;

  @Column({ type: 'text', comment: '원가율 확정', nullable: true })
  cost_rate: string;

  @Column({ type: 'date', comment: '발주일' })
  @Transform(({ value }) => excelDateToJSDate(value))
  order_date: Date;

  @Column({ type: 'date', comment: '납품일' })
  @Transform(({ value }) => excelDateToJSDate(value))
  delivery_date: Date;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '총권수', nullable: true })
  total_bks: number;

  @Column({ type: 'text', comment: '마크장비' })
  mark_equip: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '도서정가', nullable: true })
  bk_price: number;

  @Transform(
    ({ obj }) =>
      obj.win_price ?? safeFloor(multiply(obj.bk_price, obj.win_rate)),
  )
  @Column({ type: 'int', comment: '낙찰금액', nullable: true })
  win_price: number; // floor(bk_price * win_rate)

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '낙찰율(%)', nullable: true })
  win_rate: number;

  @Transform(
    ({ obj }) =>
      obj.bk_supply_price ??
      safeFloor(multiply(obj.bk_price, obj.bk_supply_rate)),
  )
  @Column({ type: 'int', comment: '도서공급단가', nullable: true })
  bk_supply_price: number; // floor(bk_price * bk_supply_rate)

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '도서공급율', nullable: true })
  bk_supply_rate: number;

  @Transform(
    ({ obj }) => obj.purchase_cost ?? multiply(obj.bk_price, obj.bk_cost_late),
  )
  @Column({ type: 'int', comment: '매입원가', nullable: true })
  purchase_cost: number; // bk_price * bk_cost_late

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '도서원가율', nullable: true })
  bk_cost_late: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '기관마,장단가(권당)', nullable: true })
  org_m_per_price: number;

  @Transform(
    ({ obj }) =>
      obj.org_m_price ?? multiply(obj.total_bks, obj.org_m_per_price),
  )
  @Column({ type: 'int', comment: '기관마,장비정가', nullable: true })
  org_m_price: number; // total_bks * org_m_per_price

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '마장공급단가', nullable: true })
  m_supply_price: number;

  @Transform(
    ({ obj }) =>
      obj.m_supply_total_price ?? multiply(obj.total_bks, obj.m_supply_price),
  )
  @Column({ type: 'int', comment: '마장공급합가', nullable: true })
  m_supply_total_price: number; // total_bks * m_supply_price

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '품절정가(간접할인 등)', nullable: true })
  out_of_stock_price: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '품절권수', nullable: true })
  out_of_stock_bks: number;

  @Transform(
    ({ obj }) =>
      obj.final_delivery_quantity ??
      subtract(obj.total_bks, obj.out_of_stock_bks),
  )
  @Column({ type: 'int', comment: '최종납품권수', nullable: true })
  final_delivery_quantity: number; // total_bks - out_of_stock_bks

  @Transform(
    ({ obj }) =>
      obj.m_final_sales ?? multiply(obj.m_supply_price, obj.m_supply_price),
  )
  @Column({ type: 'int', comment: '마장 최종매출액', nullable: true })
  m_final_sales: number; // m_supply_price * m_supply_price

  @Column({ type: 'text', comment: '결제방식', nullable: true })
  payment_method: string;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '선입금', nullable: true })
  payment: number;

  @Column({ type: 'date', comment: '선입금일자' })
  @Transform(({ value }) => excelDateToJSDate(value))
  pre_payment_date: Date;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '잔금', nullable: true })
  balance: number;

  @Column({ type: 'date', comment: '잔금일자' })
  @Transform(({ value }) => excelDateToJSDate(value))
  balance_date: Date;

  @Transform(
    ({ obj }) =>
      obj.expected_balance ??
      safeFloor(
        subtract(
          add(obj.bk_supply_price, obj.m_supply_total_price),
          add(obj.payment, obj.balance),
        ),
      ),
  )
  @Column({ type: 'int', comment: '예정잔금', nullable: true })
  expected_balance: number; // floor(bk_supply_price+m_supply_total_price-pre_payment-balance)

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '총입금액', nullable: true })
  total_payment: number;

  @Transform(
    ({ obj }) =>
      obj.final_delivery_price ?? subtract(obj.bk_price, obj.out_of_stock_bks),
  )
  @Column({ type: 'int', comment: '최종 납품정가', nullable: true })
  final_delivery_price: number; // bk_price - out_of_stock_bks

  @Transform(
    ({ obj }) =>
      obj.final_bk_sales ?? multiply(obj.bk_supply_rate, obj.m_supply_price),
  )
  @Column({ type: 'int', comment: '최종 도서매출액', nullable: true })
  final_bk_sales: number; // bk_supply_rate * m_supply_price

  @Transform(
    ({ obj }) =>
      obj.bk_revenue ??
      subtract(
        obj.final_bk_sales,
        multiply(obj.m_supply_price, obj.bk_cost_late),
      ),
  )
  @Column({ type: 'int', comment: '도서수익금', nullable: true })
  bk_revenue: number; // final_bk_sales-(m_supply_price*bk_cost_late)

  @Transform(({ obj }) => {
    if (!obj.d_day || !obj.delivery_date || !obj.today_date) return null;

    const deliveryDate = excelDateToJSDate(obj.delivery_date).getTime();
    const todayDate = excelDateToJSDate(obj.today_date).getTime();

    return (
      obj.d_day ??
      Math.floor((deliveryDate - todayDate) / (1000 * 60 * 60 * 24))
    ); // 일(day) 단위 차이
  })
  @Column({ type: 'int', comment: '남은기간(일)', nullable: true })
  d_day: number; // d-day(delivery_date-today_date)

  @Column({ type: 'date', comment: '오늘날짜', nullable: true })
  @Transform(({ value }) => excelDateToJSDate(value))
  today_date: Date;

  @Transform(transformEmptyToNull)
  @Column({ type: 'int', comment: '순이익금', nullable: true })
  net_revenue: number;

  @Transform(transformEmptyToNull)
  @Column({ type: 'float', comment: '이익율', nullable: true })
  revenue_rate: number;
}
