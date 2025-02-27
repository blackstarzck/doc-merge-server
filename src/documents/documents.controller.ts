import { Controller, Get, Param } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':documentId')
  getDocuments(@Param('documentId') id: string) {
    return this.documentsService.getDocuments(id);
  }
}
