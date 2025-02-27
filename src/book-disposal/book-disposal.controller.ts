import { Controller, Get } from '@nestjs/common';
import { BookDisposalService } from './book-disposal.service';

@Controller('book-disposal')
export class BookDisposalController {
  constructor(private readonly bookDisposalService: BookDisposalService) {}

  @Get()
  getBookDisposal() {
    return this.bookDisposalService.getBookDisposal();
  }
}
