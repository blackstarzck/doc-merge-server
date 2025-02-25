import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DocumentsModel } from 'src/documents/entity/documents.entity';
import { SheetModel } from 'src/sheet/entity/sheet.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'doc-merge',
  entities: [DocumentsModel, SheetModel],
  synchronize: true,
};

// entities: [__dirname + '/../**/*.entity.{js,ts}']
// 동적 등록: 특정 경로에서 모든 엔티티 파일을 자동으로 로드.
