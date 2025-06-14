import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReservationCommand } from '../create-reservation.command';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler implements ICommandHandler<CreateReservationCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateReservationCommand) {
    const { userId, spaceId, startTime, endTime, notes } = command;

    // Calcular la fecha a partir de startTime (a medianoche UTC)
    const dateObj = new Date(startTime);
    dateObj.setUTCHours(0, 0, 0, 0);
    const date = dateObj;

    // Verificar si el espacio existe
    const space = await this.prisma.space.findUnique({
      where: { id: spaceId },
    });

    if (!space) {
      throw new ConflictException('El espacio no existe');
    }

    // Verificar si el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ConflictException('El usuario no existe');
    }

    // Verificar si hay conflictos de horario
    const conflictingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceId,
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

    if (conflictingReservation) {
      throw new ConflictException('El espacio ya está reservado en ese horario');
    }

    // Crear la reserva
    return this.prisma.reservation.create({
      data: {
        userId,
        spaceId,
        date,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        notes,
        status: ReservationStatus.PENDING,
      },
    });
  }
}
