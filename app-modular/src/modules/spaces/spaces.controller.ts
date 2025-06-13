import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { Space } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSpaceDto } from './dto/create-space.dto';
import { SpacesService } from './spaces.service';

@ApiTags('spaces')
@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los espacios' })
  @ApiResponse({ status: 200, description: 'Lista de espacios obtenida exitosamente' })
  async findAll(): Promise<Space[]> {
    return this.spacesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un espacio por ID' })
  @ApiResponse({ status: 200, description: 'Espacio encontrado exitosamente' })
  async findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo espacio' })
  @ApiResponse({ status: 201, description: 'Espacio creado exitosamente' })
  async create(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return this.spacesService.create(createSpaceDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un espacio' })
  @ApiResponse({ status: 200, description: 'Espacio actualizado exitosamente' })
  async update(
    @Param('id') id: string,
    @Body() updateSpaceDto: Partial<CreateSpaceDto>,
  ): Promise<Space> {
    return this.spacesService.update(id, updateSpaceDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un espacio' })
  @ApiResponse({ status: 200, description: 'Espacio eliminado exitosamente' })
  async delete(@Param('id') id: string): Promise<Space> {
    return this.spacesService.delete(id);
  }
}
