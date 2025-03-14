import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'vendor_model', comment: '매입처 정보' })
export class VendorModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '업체명' })
  name: string

  @Column({ type: 'text', comment: '대표' })
  representative: string

  @Column({ type: 'text', comment: '휴대전화' })
  mobile_phone: string

  @Column({ type: 'text', comment: '사무실 대표번호' })
  office_phone: string

  @Column({ type: 'text', comment: '이메일' })
  email: string

  @Column({ type: 'text', comment: '출고율' })
  shipping_rate: string

  @Column({ type: 'text', comment: '결제' })
  payment: string

  @Column({ type: 'text', comment: '특징' })
  features: string
}
