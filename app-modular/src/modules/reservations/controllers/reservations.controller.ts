import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ReservationsService } from '../services/reservations.service';
import { Reservation, ReservationStatus } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async findAll(
    @Query('userId') userId?: string,
    @Query('spaceId') spaceId?: string,
  ): Promise<Reservation[]> {
    if (userId) {
      return this.reservationsService.findByUser(userId);
    }
    if (spaceId) {
      return this.reservationsService.findBySpace(spaceId);
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
