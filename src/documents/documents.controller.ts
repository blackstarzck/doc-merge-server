import { DocumentsService } from './documents.service'
import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments() {
    return this.documentsService.getDocuments()
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postDocuments(@UploadedFile() file: Express.Multer.File) {
    return this.documentsService.processExcel(file)

    // console.log('result: ', result)

    // return result
  }
}
