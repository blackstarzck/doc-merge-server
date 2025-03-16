import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { CreateMarkClientDto } from './dto/create-mark-client.dto'
import { MarkClientService } from './mark-client.service'

@Controller('mark_info')
export class MarkClientController {
  constructor(private readonly markClientService: MarkClientService) {}

  @Get('client')
  getMarkClients() {
    return this.markClientService.getMarkClients()
  }

  @Post('client')
  createMarkClient(@Body('data') data: CreateMarkClientDto) {
    console.log('received!!! ', data)
    return this.markClientService.createMarkClient(data)
  }

  @Get('client/:clientId')
  getMarkClientById(
    @Param('clientId', ParseIntPipe)
    clientId: number
  ) {
    return this.markClientService.getMarkClientById(clientId)
  }

  @Put('client/:clientId')
  updateMarkClient(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body('data') data: CreateMarkClientDto
  ) {
    return this.markClientService.updateMarkClient(clientId, data)
  }
}
