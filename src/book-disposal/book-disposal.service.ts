import { Injectable } from '@nestjs/common';
import { BookDisposalModel } from './entity/book-disposal.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookDisposalService {
  constructor(
    @InjectRepository(BookDisposalModel)
    private readonly bookDisposalRepository: Repository<BookDisposalModel>,
  ) {}

  async getBookDisposal() {
    return await this.bookDisposalRepository.find();
  }
}
