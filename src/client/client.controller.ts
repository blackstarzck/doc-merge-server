import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common'
import { ClientService } from './client.service'
import { CreateClientDto } from './dto/create-client.dto'

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getClients() {
    return this.clientService.getClients()
  }

  @Get(':clientId')
  getClientById(
    @Param('clientId', ParseIntPipe)
    clientId: number
  ) {
    return this.clientService.getClientById(clientId)
  }

  @Post()
  createClient(@Body('data') data: CreateClientDto) {
    return this.clientService.createClient(data)
  }

  @Put(':clientId')
  updateClient(
    @Param('clientId', ParseIntPipe) clientId: number,
    @Body('data') data: CreateClientDto
  ) {
    return this.clientService.updateClient(clientId, data)
  }
}
