import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookDeliveryModel } from './entity/book-delivery.entity';

@Injectable()
export class BookDeliveryService {
  constructor(
    @InjectRepository(BookDeliveryModel)
    private readonly bookDeliveryRepository: Repository<BookDeliveryModel>,
  ) {}

  async getBookDelivery() {
    return await this.bookDeliveryRepository.find();
  }

  async postBookDelivery(data: BookDeliveryModel[]) {
    console.log('data: ', data);

    const saved = await this.bookDeliveryRepository.save(data);

    return saved;
  }
}
