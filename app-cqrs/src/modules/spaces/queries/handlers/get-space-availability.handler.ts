import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSpaceAvailabilityQuery } from '../get-space-availability.query';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@QueryHandler(GetSpaceAvailabilityQuery)
export class GetSpaceAvailabilityHandler implements IQueryHandler<GetSpaceAvailabilityQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: GetSpaceAvailabilityQuery) {
    const { id, date } = query;

    const reservations = await this.prisma.reservation.findMany({
      where: {
        spaceId: id,
        date: new Date(date),
      },
    });

    const availableSlots = this.generateTimeSlots().filter((slot) => {
      return !reservations.some((reservation) => {
        const reservationStart = new Date(reservation.startTime);
        const reservationEnd = new Date(reservation.endTime);
        const slotTime = new Date(`${date}T${slot}`);
        return slotTime >= reservationStart && slotTime < reservationEnd;
      });
    });

    return {
      available: availableSlots.length > 0,
      availableSlots,
    };
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }
}
