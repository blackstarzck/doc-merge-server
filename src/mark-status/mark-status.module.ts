import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarkStatusModel } from './entity/mark-status.entity'
import { MarkStatusController } from './mark-status.controller'
import { MarkStatusService } from './mark-status.service'

@Module({
  imports: [TypeOrmModule.forFeature([MarkStatusModel])],
  controllers: [MarkStatusController],
  providers: [MarkStatusService]
})
export class MarkStatusModule {}
