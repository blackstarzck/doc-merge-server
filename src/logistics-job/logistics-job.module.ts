import { Module } from '@nestjs/common'
import { LogisticsJobController } from './logistics-job.controller'
import { LogisticsJobService } from './logistics-job.service'
import { LogisticsJobModel } from './entity/logistics-job.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([LogisticsJobModel])],
  exports: [LogisticsJobService],
  controllers: [LogisticsJobController],
  providers: [LogisticsJobService]
})
export class LogisticsJobModule {}
