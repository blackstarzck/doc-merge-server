import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'organization_names_model' })
export class OrganizationNamesModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'int', comment: '연도', nullable: true })
  year: number
}
