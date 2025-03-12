import { OrganizationsService } from './organizations.service';
import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { QueryRunner as QR } from 'typeorm';

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

  @Get(':organizationId')
  getOrganizationById(@Param('organizationId', ParseIntPipe) id: number) {
    return this.organizationsService.getOrganizationById(id);
  }

  @Post()
  postOrganizations(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.organizationsService.postOrganizations(data, qr);
  }

  @Post(':organizationId')
  deleteOrganizations(
    @Param('organizationId', ParseIntPipe) orgId: number,
    @Body('ids', new ParseArrayPipe({ items: Number }))
    ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.organizationsService.deleteOrganizations(orgId, ids, qr);
  }
}
