import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../commands/create-reservation.command';
import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler implements ICommandHandler<CreateReservationCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateReservationCommand) {
    const { userId, spaceId, date, startTime, endTime } = command;

    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    // Verificar que el espacio existe
    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });
    if (!space) {
      throw new NotFoundException(`Espacio con ID ${spaceId} no encontrado`);
    }

    // Verificar que no hay reservas solapadas
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceId,
        date: new Date(date),
        OR: [
          {
            AND: [
              { startTime: { lte: new Date(startTime) } },
              { endTime: { gt: new Date(startTime) } },
            ],
          },
          {
            AND: [
              { startTime: { lt: new Date(endTime) } },
              { endTime: { gte: new Date(endTime) } },
            ],
          },
        ],
      },
    });

    if (existingReservation) {
      throw new BadRequestException('Ya existe una reserva para este horario');
    }

    // Crear la reserva
    const reservation = await this.prisma.reservation.create({
      data: {
        userId,
        spaceId,
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: ReservationStatus.PENDING,
      },
    });

    // Comentado: publicación de evento si no tienes los datos requeridos
    // this.eventBus.publish(new ReservationCreatedEvent(reservation));

    return reservation;
  }
}
