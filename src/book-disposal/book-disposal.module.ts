import { Module } from '@nestjs/common'
import { BookDisposalController } from './book-disposal.controller'
import { BookDisposalService } from './book-disposal.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookDisposalModel } from './entity/book-disposal.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BookDisposalModel])],
  exports: [BookDisposalService],
  controllers: [BookDisposalController],
  providers: [BookDisposalService]
})
export class BookDisposalModule {}
