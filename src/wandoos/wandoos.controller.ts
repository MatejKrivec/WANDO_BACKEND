import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { WandoosService } from './wandoos.service';

@Controller('wandoos')
export class WandoosController {
  constructor(private readonly wandoosService: WandoosService) {}

  @Post()
  create(@Body() data: any) {
    return this.wandoosService.createWandoo(data);
  }

  @Get()
  findAll() {
    return this.wandoosService.getAllWandoos();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wandoosService.getWandooById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.wandoosService.updateWandoo(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.wandoosService.deleteWandoo(id);
  }
}
