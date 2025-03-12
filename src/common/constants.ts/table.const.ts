export const OVERVIEW_TABLES = [
  {
    label: "도서납품현황",
    name: "book_delivery",
    columns: [
      { name: "연번", key: "no" },
      { name: "마감", key: "b_close_status" },
      { name: "계산서", key: "b_invoice" },
      { name: "날짜", key: "continue_type" },
      { name: "입찰기관", key: "bid_org" },
      { name: "매출사업자", key: "sales_company" },
      { name: "낙찰업체", key: "win_company" },
      { name: "상위사업자", key: "parent_company" },
      { name: "기관명", key: "org_name" },
      { name: "매입가확정", key: "purchase_price" },
      { name: "마크장비", key: "mark_equip" },
      { name: "대체여부", key: "sub_status" },
      { name: "외주업체", key: "outsourcing_company" },
      { name: "특이사항", key: "notes" },
      { name: "진행담당자", key: "role_person" },
      { name: "공고번호", key: "bid_number" },
      { name: "계약일자", key: "contract_date" },
      { name: "발주일자", key: "order_date" },
      { name: "납품기한", key: "delivery_deadline" },
      { name: "총권수", key: "total_bks" },
      { name: "기초금액", key: "base_price" },
      { name: "낙찰금액", key: "win_price" },
      { name: "낙찰율(%)", key: "win_rate" },
      { name: "도서정가", key: "bk_price" },
      { name: "도서공급단가", key: "bk_supply_price" },
      { name: "도서공급율", key: "bk_supply_rate" },
      { name: "도서원가율", key: "bk_cost_rate" },
      { name: "업체이익금", key: "company_revenue" },
      { name: "업체이익율(낙찰가기준)", key: "company_revenue_rate" },
      { name: "자사이익율(낙찰가기준)", key: "our_revenue_rate" },
      { name: "기관마,장단가(권당)", key: "org_m_price" },
      { name: "기관마,장비납품가", key: "org_m_equip_price" },
      { name: "마장공급단가", key: "m_supply_price" },
      { name: "마장공급합가", key: "m_supply_total_price" },
      { name: "품절정가(간접할인등)", key: "out_of_stock_price" },
      { name: "품절권수", key: "out_of_stock_bks" },
      { name: "최종납품권수", key: "final_delivery_bks" },
      { name: "마장최종매출액", key: "m_final_sales" },
      { name: "선입금", key: "pre_payment" },
      { name: "선입금일자", key: "pre_payment_date" },
      { name: "잔금", key: "balance" },
      { name: "잔금일자", key: "balance_date" },
      { name: "총입금액", key: "total_payment" },
      { name: "예정잔금", key: "expected_balance" },
      { name: "최종납품정가", key: "final_delivery_price" },
      { name: "최종도서매출액", key: "final_bk_sales" },
      { name: "자사수익금", key: "our_revenue" },
      { name: "행정담당자연락처", key: "admin_contact" },
      { name: "사서연락처", key: "lib_contact" },
      { name: "기간", key: "d_day" },
      { name: "오늘날짜", key: "today_date" },
    ],
  },
  {
    label: "용역, 물품납품",
    name: "service_delivery",
    columns: [
      { name: "번호", key: "no" },
      { name: "날짜", key: "date" },
      { name: "입찰기관", key: "bid_org" },
      { name: "낙찰업체", key: "win_company" },
      { name: "상위사업자", key: "parent_company" },
      { name: "기관명", key: "org_name" },
      { name: "특이사항", key: "notes" },
      { name: "진행담당자", key: "role_person" },
      { name: "공고번호", key: "bid_num" },
      { name: "계약일자", key: "contract_date" },
      { name: "납품일자", key: "delivery_date" },
      { name: "마크장비", key: "mark_equip" },
      { name: "기초금액", key: "base_price" },
      { name: "낙찰금액", key: "win_price" },
      { name: "낙찰율(%)", key: "win_rate" },
      { name: "매입원가", key: "purchase_cost" },
      { name: "최종납품권수", key: "final_delivery_quantity" },
      { name: "최종매출액", key: "final_sales" },
      { name: "결제방식", key: "payment_method" },
      { name: "선입금일자", key: "pre_payment_date" },
      { name: "선입금", key: "pre_payment" },
      { name: "예정잔금", key: "expected_balance" },
      { name: "잔금", key: "balance" },
      { name: "잔금일자", key: "balance_date" },
      { name: "총입금액", key: "total_payment" },
      { name: "최종납품정가", key: "final_delivery_price" },
      { name: "최종도서매출액", key: "final_bk_sales" },
      { name: "수익금", key: "revenue" },
      { name: "순이익금", key: "net_revenue" },
      { name: "업체연락처", key: "company_contact" },
      { name: "업체담당자", key: "company_person" },
      { name: "행정담당자연락처", key: "admin_contact" },
      { name: "행정담당자", key: "admin_person" },
      { name: "사서연락처", key: "lib_contact" },
      { name: "사서담당자", key: "lib_person" },
    ],
  },
  {
    label: "장서점검+도서폐기",
    name: "book_disposal",
    columns: [
      { name: "번호", key: "no" },
      { name: "날짜", key: "date" },
      { name: "낙찰업체", key: "win_company" },
      { name: "상위사업자", key: "parent_company" },
      { name: "구분", key: "category" },
      { name: "기관명", key: "org_name" },
      { name: "진행", key: "status" },
      { name: "비용", key: "cost" },
      { name: "특이사항", key: "notes" },
      { name: "진행담당자", key: "role_person" },
      { name: "마크장비", key: "mark_equip" },
      { name: "최종납품권수", key: "final_delivery_bks" },
      { name: "최종매출액", key: "final_sales" },
      { name: "지출비용", key: "expend_cost" },
      { name: "선입금일자", key: "pre_payment_date" },
      { name: "선입금", key: "pre_payment" },
      { name: "예정잔금", key: "expected_balance" },
      { name: "잔금", key: "balance" },
      { name: "잔금일자", key: "balance_date" },
      { name: "총입금액", key: "total_payment" },
      { name: "수익금", key: "revenue" },
      { name: "업체연락처", key: "company_contact" },
      { name: "업체담당자", key: "company_person" },
      { name: "행정담당자연락처", key: "admin_contact" },
      { name: "행정담당자", key: "admin_person" },
      { name: "사서연락처", key: "lib_contact" },
      { name: "사서담당자", key: "lib_person" },
    ],
  },
  {
    label: "물류알바(대구, 창원, 대전)",
    name: "logistics_job",
    columns: [
      { name: "연번", key: "no" },
      { name: "작성자", key: "author" },
      { name: "진행건", key: "progress_item" },
      { name: "수량", key: "quantity" },
      { name: "발송일자", key: "shipment_date" },
      { name: "진행인원", key: "progress_person" },
      { name: "납품일자", key: "delivery_date" },
      { name: "수수료", key: "commission" },
      { name: "추가비용", key: "additional_cost" },
      { name: "정산비용", key: "settlement_cost" },
      { name: "정산일자", key: "settlement_date" },
      { name: "발송방법", key: "shipping_method" },
      { name: "송장번호", key: "tracking_number" },
      { name: "비고", key: "remarks" },
    ],
  },
  {
    label: "화물사용",
    name: "cargo_usage",
    columns: [
      { name: "연번", key: "no" },
      { name: "작성자", key: "author" },
      { name: "도착지", key: "destination" },
      { name: "진행건", key: "progress_item" },
      { name: "수량", key: "quantity" },
      { name: "발송일자", key: "shipment_date" },
      { name: "업체", key: "company" },
      { name: "납품일자", key: "delivery_date" },
      { name: "요금", key: "cost" },
      { name: "추가비용", key: "additional_cost" },
      { name: "정산비용", key: "settlement_cost" },
      { name: "정산일자", key: "settlement_date" },
      { name: "차량", key: "vehicle" },
      { name: "비고", key: "remarks" },
    ],
  },
];

export const ORGANIZATION_COLUMNS = [
  { name: "입력타이틀", key: "sheet_name" },
  { name: "번호", key: "row_num" },
  { name: "타이틀별번호", key: "sheet_data_num" },
  { name: "기관명", key: "org_name" },
  { name: "마감", key: "b_close_date" },
  { name: "계산서", key: "b_invoice" },
  { name: "낙찰업체", key: "win_company" },
  { name: "상위사업자", key: "parent_company" },
  { name: "구분", key: "category" },
  { name: "특이사항", key: "notes" },
  { name: "담당", key: "role_person" },
  { name: "원가율확정", key: "cost_rate" },
  { name: "발주일", key: "order_date" },
  { name: "납품일", key: "delivery_date" },
  { name: "총권수", key: "total_bks" },
  { name: "마크장비", key: "mark_equip" },
  { name: "도서정가", key: "bk_price" },
  { name: "낙찰금액", key: "win_price" },
  { name: "낙찰율(%)", key: "win_rate" },
  { name: "도서공급단가", key: "bk_supply_price" },
  { name: "도서공급율", key: "bk_supply_rate" },
  { name: "매입원가", key: "purchase_cost" },
  { name: "도서원가율", key: "bk_cost_late" },
  { name: "기관마,장단가(권당)", key: "org_m_per_price" },
  { name: "기관마,장비정가", key: "org_m_price" },
  { name: "마장공급단가", key: "m_supply_price" },
  { name: "마장공급합가", key: "m_supply_total_price" },
  { name: "품절정가(간접할인등)", key: "out_of_stock_price" },
  { name: "품절권수", key: "out_of_stock_bks" },
  { name: "최종납품권수", key: "final_delivery_quantity" },
  { name: "마장최종매출액", key: "m_final_sales" },
  { name: "결제방식", key: "payment_method" },
  { name: "선입금", key: "payment" },
  { name: "선입금일자", key: "pre_payment_date" },
  { name: "잔금", key: "balance" },
  { name: "잔금일자", key: "balance_date" },
  { name: "예정잔금", key: "expected_balance" },
  { name: "총입금액", key: "total_payment" },
  { name: "최종납품정가", key: "final_delivery_price" },
  { name: "최종도서매출액", key: "final_bk_sales" },
  { name: "도서수익금", key: "bk_revenue" },
  { name: "남은기간", key: "d_day" },
  { name: "오늘날짜", key: "today_date" },
  { name: "순이익금", key: "net_revenue" },
  { name: "이익율", key: "revenue_rate" },
];
