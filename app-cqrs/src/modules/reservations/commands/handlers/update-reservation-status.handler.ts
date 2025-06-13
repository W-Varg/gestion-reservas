import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReservationStatusCommand } from '../update-reservation-status.command';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ReservationStatus } from '@prisma/client';

@CommandHandler(UpdateReservationStatusCommand)
export class UpdateReservationStatusHandler implements ICommandHandler<UpdateReservationStatusCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: UpdateReservationStatusCommand) {
    const { id, status } = command;
    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: { status: status as ReservationStatus },
    });
    // Comentado: publicación de evento si no tienes los datos requeridos
    // this.eventBus.publish(new ReservationStatusUpdatedEvent(reservation));
    return reservation;
  }
}
