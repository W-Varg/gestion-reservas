import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetReservationsQuery } from '../get-reservations.query';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetReservationsQuery)
export class GetReservationsHandler implements IQueryHandler<GetReservationsQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetReservationsQuery) {
    const { userId, spaceId, status } = query;

    const where: any = {};
    if (userId) where.userId = userId;
    if (spaceId) where.spaceId = spaceId;
    if (status) where.status = status;

    return this.prisma.reservation.findMany({
      where,
      include: {
        user: true,
        space: true,
      },
    });
  }
}
