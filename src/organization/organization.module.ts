import { Module } from '@nestjs/common'
import { OrganizationService } from './organization.service'
import { organizationsController } from './organization.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrganizationModel } from './entity/organizations.entity'
import { OrganizationNamesModel } from './entity/organization-names.entity'

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationModel, OrganizationNamesModel])],
  exports: [OrganizationService],
  providers: [OrganizationService],
  controllers: [organizationsController]
})
export class OrganizationsModule {}
