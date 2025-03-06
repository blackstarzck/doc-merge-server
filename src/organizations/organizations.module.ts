import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { organizationsController } from './organizations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsModel } from './entity/organizations.entity';
import { OrganizationNamesModel } from './entity/organization-names.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationsModel, OrganizationNamesModel]),
  ],
  exports: [OrganizationsService],
  providers: [OrganizationsService],
  controllers: [organizationsController],
})
export class OrganizationsModule {}
