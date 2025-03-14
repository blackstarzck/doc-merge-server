import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'client_model', comment: '거래처 정보' })
export class ClientModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text', comment: '거래처명' })
  name: string
}
