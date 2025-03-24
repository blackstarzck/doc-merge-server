import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'vendor_model', comment: '매입처 정보' })
export class VendorModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '업체명', nullable: true })
  name: string

  @Column({ type: 'text', comment: '대표', nullable: true })
  representative: string

  @Column({ type: 'text', comment: '휴대전화', nullable: true })
  mobile_phone: string

  @Column({ type: 'text', comment: '사무실 대표번호', nullable: true })
  office_phone: string

  @Column({ type: 'text', comment: '이메일', nullable: true })
  email: string

  @Column({ type: 'text', comment: '출고율', nullable: true })
  shipping_rate: string

  @Column({ type: 'text', comment: '결제', nullable: true })
  payment: string

  @Column({ type: 'text', comment: '특징', nullable: true })
  notes: string
}
