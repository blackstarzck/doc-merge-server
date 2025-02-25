import { BaseModel } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DocumentsModel extends BaseModel {
  @Column({ type: 'text', comment: '입력타이틀' })
  sheet_name: string;

  @Column({ type: 'int', comment: '타이틀별 번호' })
  sheet_data_num: number;
}
