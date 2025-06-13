import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation, ReservationStatus } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindReservationsDto } from './dto/find-reservations.dto';

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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Reservation | null> {
    return this.reservationsService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: { date: Date; startTime: Date; endTime: Date; userId: string; spaceId: string },
  ): Promise<Reservation> {
    return this.reservationsService.create(data);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: ReservationStatus,
  ): Promise<Reservation> {
    return this.reservationsService.updateStatus(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.delete(id);
  }
}
