import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'mark_client_model', comment: '마크장비 거래처 정보' })
export class MarkClientModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '거래처명' })
  name: string

  @Column({ type: 'text', comment: '아이피 주소' })
  ip_address: string

  @Column({ type: 'text', comment: '전화번호' })
  phone: string

  @Column({ type: 'text', comment: '이메일' })
  email: string

  @Column({ type: 'text', comment: '주소' })
  address: string

  @Column({ type: 'text', comment: '특징' })
  notes: string
}
