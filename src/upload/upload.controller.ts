import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { DataSource, QueryRunner as QR } from 'typeorm';
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUpload(@UploadedFile() file: Express.Multer.File, @QueryRunner() qr: QR) {
    return this.uploadService.postUpload(file, qr);
  }
}
