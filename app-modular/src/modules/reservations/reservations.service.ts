import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/database/prisma.service';
import { Reservation, ReservationStatus } from '@prisma/client';
import { NotificationsService } from '../notifications/services/notifications.service';

@Injectable()
export class ReservationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      include: {
        user: true,
        space: true,
      },
    });
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });
  }

  async findByUser(userId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: {
        space: true,
      },
    });
  }

  async findBySpace(spaceId: string): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      where: { spaceId },
      include: {
        user: true,
      },
    });
  }

  async create(data: {
    date: Date;
    startTime: Date;
    endTime: Date;
    userId: string;
    spaceId: string;
  }): Promise<Reservation> {
    // Verificar disponibilidad
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceId: data.spaceId,
        date: data.date,
        OR: [
          {
            AND: [{ startTime: { lte: data.startTime } }, { endTime: { gt: data.startTime } }],
          },
          {
            AND: [{ startTime: { lt: data.endTime } }, { endTime: { gte: data.endTime } }],
          },
        ],
      },
    });

    if (existingReservation) {
      throw new BadRequestException('El espacio ya está reservado para este horario');
    }

    const reservation = await this.prisma.reservation.create({
      data,
      include: {
        user: true,
        space: true,
      },
    });

    // Enviar notificación de confirmación
    await this.notificationsService.sendReservationConfirmation(reservation);

    return reservation;
  }

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation> {
    const reservation = await this.prisma.reservation.update({
      where: { id },
      data: { status },
      include: {
        user: true,
        space: true,
      },
    });

    // Enviar notificación de actualización de estado
    await this.notificationsService.sendReservationStatusUpdate(reservation);

    return reservation;
  }

  async delete(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.delete({
      where: { id },
      include: {
        user: true,
        space: true,
      },
    });

    // Enviar notificación de cancelación
    await this.notificationsService.sendReservationCancellation(reservation);

    return reservation;
  }
}
