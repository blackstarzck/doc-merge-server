import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'organization_names_model' })
export class OrganizationNamesModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;
}
