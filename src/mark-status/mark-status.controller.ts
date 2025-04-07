import { MarkStatusService } from './mark-status.service'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('mark_status')
export class MarkStatusController {
  constructor(private readonly markStatusService: MarkStatusService) {}

  @Get(':markStatusId')
  getMarkStatusById(@Param('markStatusId', ParseIntPipe) markStatusId: number) {
    return this.markStatusService.getMarkStatusById(markStatusId)
  }
}
