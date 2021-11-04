import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('markers')
@Controller('marker')
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}

  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markerService.create(createMarkerDto);
  }

  @Get()
  findAll() {
    return this.markerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMarkerDto: UpdateMarkerDto) {
    return this.markerService.update(id, updateMarkerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markerService.remove(id);
  }
}
