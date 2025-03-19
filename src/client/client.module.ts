import { Module } from '@nestjs/common'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientModel } from './entity/client.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ClientModel])],
  exports: [ClientService],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
