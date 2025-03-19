import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { QueryRunner as QR } from 'typeorm'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/overview/:overviewId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUploadOverview(
    @UploadedFile() file: Express.Multer.File,
    @QueryRunner() qr: QR,
    @Param('overviewId') overviewId: string
  ) {
    return this.uploadService.postUpload('overview', file, overviewId, qr)
  }

  @Post('/organization/:organizationId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUpload(
    @UploadedFile() file: Express.Multer.File,
    @QueryRunner() qr: QR,
    @Param('organizationId', ParseIntPipe) organizationId: number
  ) {
    return this.uploadService.postUpload('organization', file, organizationId, qr)
  }

  @Post('/vendor_ledger/:vendorId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUploadVendorLedger(
    @UploadedFile() file: Express.Multer.File,
    @QueryRunner() qr: QR,
    @Param('vendorId', ParseIntPipe) vendorId: number
  ) {
    return this.uploadService.postUpload('vendor_ledger', file, vendorId, qr)
  }

  @Post('/client_ledger/:clientId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postUploadClientLedger(
    @UploadedFile() file: Express.Multer.File,
    @QueryRunner() qr: QR,
    @Param('clientId', ParseIntPipe) clientId: number
  ) {
    return this.uploadService.postUpload('client_ledger', file, clientId, qr)
  }
}
