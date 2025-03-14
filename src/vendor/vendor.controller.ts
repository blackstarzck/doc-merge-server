import { Body, Controller, Get, Post } from '@nestjs/common'
import { VendorService } from './vendor.service'
import { CreateVendorDto } from './dto/create-vendor.dto'

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  getClients() {
    return this.vendorService.getVendors()
  }

  @Post()
  createVendor(@Body('data') data: CreateVendorDto) {
    return this.vendorService.createVendor(data)
  }
}
