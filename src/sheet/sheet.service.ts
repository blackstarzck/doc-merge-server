import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SheetModel } from './entity/sheet.entity';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(SheetModel)
    private readonly sheetRepository: Repository<SheetModel>,
  ) {}

  async getSheets() {
    const sheets = await this.sheetRepository.find();

    console.log('sheets: ', sheets);

    return sheets;
  }
}
