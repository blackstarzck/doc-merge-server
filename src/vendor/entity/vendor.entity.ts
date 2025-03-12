import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "vendor_model", comment: "매입처 정보" }) // 테이블 이름은 'company'로 가정, 필요 시 수정 가능
export class VendorModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", comment: "업체명" })
  vendor_name: string;

  @Column({ type: "text", comment: "대표" })
  representative: string;

  @Column({ type: "text", comment: "휴대전화" })
  mobile_phone: string;

  @Column({ type: "text", comment: "사무실 대표번호" })
  office_phone: string;

  @Column({ type: "text", comment: "이메일" })
  email: string;

  @Column({ type: "text", comment: "출고율" })
  shipping_rate: string;

  @Column({ type: "text", comment: "결제" })
  payment: string;

  @Column({ type: "text", comment: "특징" })
  features: string;
}
