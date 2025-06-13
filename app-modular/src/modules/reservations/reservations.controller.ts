import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/create-reservation.dto';
import { FindReservationsDto } from './dto/find-reservations.dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({ status: 200, description: 'Lista de reservas obtenida exitosamente' })
  async findAll(@Query() query: FindReservationsDto): Promise<Reservation[]> {
    if (query.userId) {
      return this.reservationsService.findByUser(query.userId);
    }
    if (query.spaceId) {
      return this.reservationsService.findBySpace(query.spaceId);
    }
    return this.reservationsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada exitosamente' })
  async findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente' })
  async create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva actualizada exitosamente' })
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @ApiBearerAuth()
  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar el estado de una reserva' })
  @ApiResponse({ status: 200, description: 'Estado de la reserva actualizado exitosamente' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateReservationStatusDto,
  ): Promise<Reservation> {
    return this.reservationsService.updateStatus(id, updateStatusDto.status);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva' })
  @ApiResponse({ status: 200, description: 'Reserva eliminada exitosamente' })
  async delete(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.delete(id);
  }
}
