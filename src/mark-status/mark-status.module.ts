import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarkStatusModel } from './entity/mark-status.entity'
import { MarkStatusController } from './mark-status.controller'
import { MarkStatusService } from './mark-status.service'
import { MarkClientModule } from 'src/mark-client/mark-client.module'

@Module({
  imports: [MarkClientModule, TypeOrmModule.forFeature([MarkStatusModel])],
  exports: [MarkStatusService],
  controllers: [MarkStatusController],
  providers: [MarkStatusService]
})
export class MarkStatusModule {}
