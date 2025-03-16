import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { VendorService } from './vendor.service'
import { CreateVendorDto } from './dto/create-vendor.dto'

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  getVendors() {
    return this.vendorService.getVendors()
  }

  @Get(':vendorId')
  getVendorById(
    @Param('vendorId', ParseIntPipe)
    vendorId: number
  ) {
    return this.vendorService.getVendorById(vendorId)
  }

  @Post()
  createVendor(@Body('data') data: CreateVendorDto) {
    return this.vendorService.createVendor(data)
  }

  @Put(':vendorId')
  updateVendor(
    @Param('vendorId', ParseIntPipe) clientId: number,
    @Body('data') data: CreateVendorDto
  ) {
    return this.vendorService.updateVendor(clientId, data)
  }
}
