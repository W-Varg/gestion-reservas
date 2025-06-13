import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { GetUserQuery } from '../queries/get-user.query';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida exitosamente' })
  async findAll() {
    return this.queryBus.execute(new GetUserQuery());
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado exitosamente' })
  async findOne(@Param('id') id: string) {
    const query = new GetUserQuery();
    query.id = id;
    return this.queryBus.execute(query);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  async create(@Body() createUserCommand: CreateUserCommand) {
    return this.commandBus.execute(createUserCommand);
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
  async update(@Param('id') id: string, @Body() updateUserCommand: CreateUserCommand) {
    return this.commandBus.execute({ ...updateUserCommand, id });
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  async remove(@Param('id') id: string) {
    return this.commandBus.execute({ id });
  }
}
