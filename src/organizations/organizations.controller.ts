import { OrganizationsService } from './organizations.service';
import { Controller, Get, Post } from '@nestjs/common';

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
}
