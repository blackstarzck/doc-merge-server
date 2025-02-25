import { Controller, Get, Post } from '@nestjs/common';
import { SheetService } from './sheet.service';

@Controller('sheets')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @Get()
  getSheets() {
    return this.sheetService.getSheets();
  }
}
