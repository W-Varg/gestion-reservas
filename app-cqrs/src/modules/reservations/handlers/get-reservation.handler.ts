import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReservationQuery } from '../queries/get-reservation.query';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetReservationQuery)
export class GetReservationHandler implements IQueryHandler<GetReservationQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetReservationQuery) {
    const { id } = query;
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reservation;
  }
} 