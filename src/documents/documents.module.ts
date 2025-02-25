import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModel } from './entity/documents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsModel])],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
