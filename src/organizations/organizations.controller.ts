import { OrganizationsService } from './organizations.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';

@Controller('organizations')
export class organizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  getOrganizations() {
    return this.organizationsService.getOrganizations();
  }

  @Get('names')
  getOrganizationNames() {
    return this.organizationsService.getOrganizationNames();
  }

  @Post()
  postOrganizations(data) {
    return this.organizationsService.postOrganizations(data);
  }

  @Delete(':ids')
  deleteOrganizations(
    @Param('ids', new ParseArrayPipe({ items: Number })) ids: number[],
  ) {
    return this.organizationsService.deleteOrganizations(ids);
  }
}
