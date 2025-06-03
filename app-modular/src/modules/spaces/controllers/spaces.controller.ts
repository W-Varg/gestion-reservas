import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { SpacesService } from '../services/spaces.service';
import { Space, SpaceType } from '@prisma/client';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get()
  async findAll(@Query('type') type?: SpaceType): Promise<Space[]> {
    if (type) {
      return this.spacesService.findByType(type);
    }
    return this.spacesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Space | null> {
    return this.spacesService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: { name: string; type: SpaceType; capacity: number; description?: string },
  ): Promise<Space> {
    return this.spacesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Space>): Promise<Space> {
    return this.spacesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Space> {
    return this.spacesService.delete(id);
  }
}
