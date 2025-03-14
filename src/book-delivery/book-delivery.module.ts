import { DynamicModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookDeliveryController } from './book-delivery.controller'
import { BookDeliveryService } from './book-delivery.service'
import { BookDeliveryModel } from './entity/book-delivery.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BookDeliveryModel])],
  exports: [BookDeliveryService],
  controllers: [BookDeliveryController],
  providers: [BookDeliveryService]
})
export class BookDeliveryModule {}
