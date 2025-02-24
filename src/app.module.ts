import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DocumentsModule } from './documents/documents.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DocumentModel } from './documents/entity/documents.entity'

@Module({
  imports: [
    DocumentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'doc-merge',
      entities: [DocumentModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
