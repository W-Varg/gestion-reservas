import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSpaceCommand } from '../commands/create-space.command';
import { GetSpaceQuery } from '../queries/get-space.query';
import { GetAllSpacesQuery } from '../queries/get-all-spaces.query';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Espacios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('spaces')
export class SpacesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los espacios' })
  @ApiResponse({ status: 200, description: 'Lista de espacios' })
  findAll() {
    return this.queryBus.execute(new GetAllSpacesQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un espacio por ID' })
  @ApiResponse({ status: 200, description: 'Espacio encontrado' })
  @ApiResponse({ status: 404, description: 'Espacio no encontrado' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetSpaceQuery(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo espacio' })
  @ApiResponse({ status: 201, description: 'Espacio creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createSpaceDto: CreateSpaceCommand) {
    return this.commandBus.execute(createSpaceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un espacio' })
  @ApiResponse({ status: 200, description: 'Espacio actualizado' })
  @ApiResponse({ status: 404, description: 'Espacio no encontrado' })
  update(@Param('id') id: string, @Body() updateSpaceDto: Partial<CreateSpaceCommand>) {
    return this.commandBus.execute(new CreateSpaceCommand());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un espacio' })
  @ApiResponse({ status: 200, description: 'Espacio eliminado' })
  @ApiResponse({ status: 404, description: 'Espacio no encontrado' })
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new CreateSpaceCommand());
  }
}
