import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reservas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'Conflicto con otra reserva' })
  create(@Body() createReservationDto: CreateReservationCommand) {
    return this.commandBus.execute(
      new CreateReservationCommand(
        createReservationDto.userId,
        createReservationDto.spaceId,
        createReservationDto.startTime,
        createReservationDto.endTime,
        createReservationDto.notes,
      ),
    );
  }
}
