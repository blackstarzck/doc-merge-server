import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { QueryRunner as QR } from 'typeorm'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/overview/:overviewId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postOverViewUpload(
    @UploadedFile() file: Express.Multer.File,
    @Param('overviewId') overviewId: string,
    @QueryRunner('qr') qr: QR
  ) {
    return this.uploadService.postOverViewUpload(file, overviewId, qr)
  }

  @Post('/organization/:organizationId')
  @UseInterceptors(FileInterceptor('file'))
  postOrganizationUpload(
    @UploadedFile() file: Express.Multer.File,
    @Param('organizationId', ParseIntPipe) organizationId: number
  ) {
    return this.uploadService.postOrganizationUpload(file, organizationId)
  }

  @Post('/vendor_ledger/:vendorId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postVendorLedgerUpload(
    @UploadedFile() file: Express.Multer.File,
    @Param('vendorId', ParseIntPipe) vendorId: number,
    @QueryRunner('qr') qr: QR
  ) {
    return this.uploadService.postVendorLedgerUpload(file, vendorId, qr)
  }

  @Post('/client_ledger/:clientId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postClientLedgerUpload(
    @UploadedFile() file: Express.Multer.File,
    @Param('clientId', ParseIntPipe) clientId: number,
    @QueryRunner('qr') qr: QR
  ) {
    return this.uploadService.postClientLedgerUpload(file, clientId, qr)
  }

  @Post('/mark_status/:markClientId')
  @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(TransationInterceptor)
  postMarkStatusUpload(
    @UploadedFile() file: Express.Multer.File,
    @Param('markClientId', ParseIntPipe) markClientId: number,
    @QueryRunner('qr') qr: QR
  ) {
    return this.uploadService.postMarkStatusUpload(file, markClientId, qr)
  }
}
