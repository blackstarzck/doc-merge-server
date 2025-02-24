import { BaseModel } from 'src/common/entity/base.entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class DocumentModel extends BaseModel {
  @Column({ type: 'text', comment: '원가율 확정' })
  cost_rate: string

  @Column({ type: 'text', comment: '결제방식' })
  payment_method: string

  @Column({ type: 'int', comment: '남은기간' })
  d_day: string

  @Column({ type: 'date', comment: '오늘날짜' })
  today_date: Date

  @Column({ type: 'float', comment: '이익율' })
  revenue_rate: number
}
