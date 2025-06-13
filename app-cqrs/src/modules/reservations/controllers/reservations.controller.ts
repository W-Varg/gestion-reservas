import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { GetReservationQuery } from '../queries/get-reservation.query';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('reservations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({ status: 200, description: 'Lista de reservas' })
  findAll() {
    return this.queryBus.execute(new GetReservationQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetReservationQuery());
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada' })
  create(@Body() createReservationDto: CreateReservationCommand) {
    return this.commandBus.execute(new CreateReservationCommand());
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva actualizada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  update(@Param('id') id: string, @Body() updateReservationDto: Partial<CreateReservationCommand>) {
    return this.commandBus.execute(new CreateReservationCommand());
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva eliminada' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new CreateReservationCommand());
  }
}
