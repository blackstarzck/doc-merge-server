import { Module } from '@nestjs/common'
import { ServiceDeliveryController } from './service-delivery.controller'
import { ServiceDeliveryService } from './service-delivery.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServiceDeliveryModel } from './entity/service-delivery.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ServiceDeliveryModel])],
  exports: [ServiceDeliveryService],
  controllers: [ServiceDeliveryController],
  providers: [ServiceDeliveryService]
})
export class ServiceDeliveryModule {}
