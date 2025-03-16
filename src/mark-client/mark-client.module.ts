import { Module } from '@nestjs/common'
import { MarkClientController } from './mark-client.controller'
import { MarkClientService } from './mark-client.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MarkClientModel } from './entity/mark-client.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MarkClientModel])],
  controllers: [MarkClientController],
  providers: [MarkClientService]
})
export class MarkClientModule {}
