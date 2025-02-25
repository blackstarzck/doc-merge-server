import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetModel } from './entity/sheet.entity';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SheetModel])],
  providers: [SheetService],
  controllers: [SheetController],
})
export class SheetModule {}
