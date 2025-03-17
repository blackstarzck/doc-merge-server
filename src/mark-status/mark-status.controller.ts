import { MarkStatusService } from './mark-status.service'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('mark_status')
export class MarkStatusController {
  constructor(private readonly markStatusService: MarkStatusService) {}

  @Get(':markInfoId')
  getVendorLedgerById(@Param('markInfoId', ParseIntPipe) markInfoId: number) {
    return this.markStatusService.getVendorLedgerById(markInfoId)
  }
}
