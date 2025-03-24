import { OrganizationService } from './organization.service'
import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { QueryRunner as QR } from 'typeorm'
import { CreateOrganizationNameDto } from './dto/create_organization-name.dto'
import { QueryRunner } from 'src/common/decorator/query-runner.decorator'
import { TransationInterceptor } from 'src/common/interceptor/transaction.interceptor'

@Controller('organization')
export class organizationsController {
  constructor(private readonly OrganizationService: OrganizationService) {}

  @Get('info')
  getOrganizationNames() {
    return this.OrganizationService.getOrganizationNames()
  }

  @Get()
  getAllOrganizations() {
    return this.OrganizationService.getAllOrganizations()
  }

  @Get(':organizationId')
  getOrganizationById(@Param('organizationId', ParseIntPipe) id: number) {
    return this.OrganizationService.getOrganizationById(id)
  }

  @Post(':organizationId')
  @UseInterceptors(TransationInterceptor)
  postOrganizations(@Body('document') data: any[], @QueryRunner('qr') qr: QR) {
    return this.OrganizationService.postOrganizations(data, qr)
  }

  @Post('register')
  createOrganizationName(@Body('data') data: CreateOrganizationNameDto) {
    return this.OrganizationService.createOrganizationName(data)
  }

  @Post(':organizationId/delete')
  @UseInterceptors(TransationInterceptor)
  deleteOrganizations(
    @Param('organizationId', ParseIntPipe) orgId: number,
    @Body('ids', new ParseArrayPipe({ items: Number }))
    ids: number[],
    @QueryRunner('qr') qr: QR
  ) {
    return this.OrganizationService.deleteOrganizations(orgId, ids, qr)
  }

  @Put('update/:organizationId')
  updateOrganizationName(
    @Param('organizationId', ParseIntPipe) orgId: number,
    @Body('data') data: CreateOrganizationNameDto
  ) {
    return this.OrganizationService.updateOrganizationName(orgId, data)
  }
}
