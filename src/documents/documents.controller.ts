import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(':documentId')
  getDocument(@Param('documentId') id: string) {
    return this.documentsService.getDocument(id);
  }

  @Post(':documentId')
  postDocument(@Param('documentId') id: string, @Body('document') data: any[]) {
    return this.documentsService.postDocument(data, id);
  }
}
