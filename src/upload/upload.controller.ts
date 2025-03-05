import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { DataSource, QueryRunner as QR } from 'typeorm';
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { DocumentTypesEN } from './types/types';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/:documentId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUpload(
    @UploadedFile() file: Express.Multer.File,
    @QueryRunner() qr: QR,
    @Param('documentId') documentId: string,
  ) {
    const isNumeric = /^[+-]?\d*\.?\d+$/.test(documentId);
    const id = isNumeric
      ? parseInt(documentId)
      : (documentId as DocumentTypesEN);
    return this.uploadService.postUpload(file, id, qr);
  }
}
