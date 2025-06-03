import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateReservationStatusCommand } from '../update-reservation-status.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { ReservationStatusUpdatedEvent } from '../../events/reservation-status-updated.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(UpdateReservationStatusCommand)
export class UpdateReservationStatusHandler
  implements ICommandHandler<UpdateReservationStatusCommand>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateReservationStatusCommand) {
    const { id, status } = command;

    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        space: true,
      },
    });

    this.eventBus.publish(new ReservationStatusUpdatedEvent(reservation));

    return reservation;
  }
}
