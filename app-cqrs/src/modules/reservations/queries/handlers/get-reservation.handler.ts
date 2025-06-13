import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReservationQuery } from '../get-reservation.query';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetReservationQuery)
export class GetReservationHandler implements IQueryHandler<GetReservationQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetReservationQuery) {
    const { id } = query;

    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });
  }
}
