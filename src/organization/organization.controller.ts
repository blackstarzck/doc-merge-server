import { OrganizationService } from './organization.service'
import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Query
} from '@nestjs/common'
import { QueryRunner as QR } from 'typeorm'

@Controller('organization')
export class organizationsController {
  constructor(private readonly OrganizationService: OrganizationService) {}

  @Get()
  getOrganizations() {
    return this.OrganizationService.getOrganizations()
  }

  @Get('info')
  getOrganizationNames() {
    return this.OrganizationService.getOrganizationNames()
  }

  @Get(':organizationId')
  getOrganizationById(@Param('organizationId', ParseIntPipe) id: number) {
    return this.OrganizationService.getOrganizationById(id)
  }

  @Post()
  postOrganizations(@Body('document') data: any[], @Query('qr') qr: QR) {
    return this.OrganizationService.postOrganizations(data, qr)
  }

  @Post(':organizationId')
  deleteOrganizations(
    @Param('organizationId', ParseIntPipe) orgId: number,
    @Body('ids', new ParseArrayPipe({ items: Number }))
    ids: number[],
    @Query('qr') qr: QR
  ) {
    return this.OrganizationService.deleteOrganizations(orgId, ids, qr)
  }
}
