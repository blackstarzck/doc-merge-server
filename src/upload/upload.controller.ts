import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { QueryRunner as QR } from 'typeorm';
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor';

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
    return this.uploadService.postUpload(file, documentId, qr);
  }
}
