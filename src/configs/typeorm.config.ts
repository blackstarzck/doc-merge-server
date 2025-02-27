import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'doc-merge',
  entities: [__dirname + '/../**/entity/*.entity.{js,ts}'],
  synchronize: true,
};

// entities: [__dirname + '/../**/*.entity.{js,ts}']
// 동적 등록: 특정 경로에서 모든 엔티티 파일을 자동으로 로드.
