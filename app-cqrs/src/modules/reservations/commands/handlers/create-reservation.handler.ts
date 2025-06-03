import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../create-reservation.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { ReservationCreatedEvent } from '../../events/reservation-created.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler implements ICommandHandler<CreateReservationCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateReservationCommand) {
    const { userId, spaceId, date, startTime, endTime } = command;

    const reservation = await this.prisma.reservation.create({
      data: {
        userId,
        spaceId,
        date,
        startTime,
        endTime,
        status: 'pending',
      },
      include: {
        user: true,
        space: true,
      },
    });

    this.eventBus.publish(new ReservationCreatedEvent(reservation));

    return reservation;
  }
}
