import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { UpdateReservationStatusCommand } from '../commands/update-reservation-status.command';
import { GetReservationQuery } from '../queries/get-reservation.query';
import { GetReservationsQuery } from '../queries/get-reservations.query';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createReservationDto: any) {
    const command = new CreateReservationCommand(
      createReservationDto.userId,
      createReservationDto.spaceId,
      new Date(createReservationDto.date),
      new Date(createReservationDto.startTime),
      new Date(createReservationDto.endTime),
    );
    return this.commandBus.execute(command);
  }

  @Get()
  async findAll(
    @Query('userId') userId?: string,
    @Query('spaceId') spaceId?: string,
    @Query('status') status?: string,
  ) {
    const query = new GetReservationsQuery(userId, spaceId, status);
    return this.queryBus.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = new GetReservationQuery(id);
    return this.queryBus.execute(query);
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const command = new UpdateReservationStatusCommand(id, status);
    return this.commandBus.execute(command);
  }
}
