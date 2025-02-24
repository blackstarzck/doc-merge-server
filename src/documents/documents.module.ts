import { Module } from '@nestjs/common'
import { DocumentsService } from './documents.service'
import { DocumentsController } from './documents.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DocumentModel } from './entity/documents.entity'

@Module({
  imports: [TypeOrmModule.forFeature([DocumentModel])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
