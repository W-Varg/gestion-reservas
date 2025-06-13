import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/create-reservation.dto';
import { Reservation, ReservationStatus } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { SpacesService } from '../spaces/spaces.service';
import { NotificationsService } from '../notifications/services/notifications.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly spacesService: SpacesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({
      include: { user: true, space: true },
    });
  }

  async findOne(id: string): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: { user: true, space: true },
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async findByUser(userId: string): Promise<Reservation[]> {
    await this.usersService.findOne(userId);
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { user: true, space: true },
    });
  }

  async findBySpace(spaceId: string): Promise<Reservation[]> {
    await this.spacesService.findOne(spaceId);
    return this.prisma.reservation.findMany({
      where: { spaceId },
      include: { user: true, space: true },
    });
  }

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, spaceId, startTime, endTime, notes } = createReservationDto;
    await this.usersService.findOne(userId);
    await this.spacesService.findOne(spaceId);

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }
    const overlappingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceId,
        OR: [
          { AND: [{ startTime: { lte: start } }, { endTime: { gt: start } }] },
          { AND: [{ startTime: { lt: end } }, { endTime: { gte: end } }] },
        ],
      },
    });
    console.log(overlappingReservation);

    if (overlappingReservation) {
      console.log('execute');

      throw new BadRequestException('Ya existe una reserva en el horario seleccionado');
    }
    try {
      const data = {
        userId,
        spaceId,
        startTime: start,
        endTime: end,
        date: start,
        status: ReservationStatus.PENDING,
        notes,
      };
      console.log(data);

      const reservation = await this.prisma.reservation.create({
        data,
        include: { user: true, space: true },
      });
      if (reservation) {
        // await this.notificationsService.sendReservationConfirmation(reservation);
      }
      return reservation;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);
    const { userId, spaceId, startTime, endTime, notes } = updateReservationDto;
    await this.usersService.findOne(userId);
    await this.spacesService.findOne(spaceId);
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }
    const overlappingReservation = await this.prisma.reservation.findFirst({
      where: {
        spaceId,
        id: { not: id },
        OR: [
          { AND: [{ startTime: { lte: start } }, { endTime: { gt: start } }] },
          { AND: [{ startTime: { lt: end } }, { endTime: { gte: end } }] },
        ],
      },
    });
    if (overlappingReservation) {
      throw new BadRequestException(
        'Ya existe una reserva que se solapa con el horario seleccionado',
      );
    }
    const updatedReservation = await this.prisma.reservation.update({
      where: { id },
      data: {
        userId,
        spaceId,
        startTime: start,
        endTime: end,
        date: start,
        notes,
      },
      include: { user: true, space: true },
    });
    // await this.notificationsService.sendReservationStatusUpdate(updatedReservation);
    return updatedReservation;
  }

  async updateStatus(id: string, status: ReservationStatus): Promise<Reservation> {
    await this.findOne(id);
    if (!Object.values(ReservationStatus).includes(status)) {
      throw new BadRequestException('Estado de reserva inválido');
    }
    const updatedReservation = await this.prisma.reservation.update({
      where: { id },
      data: { status },
      include: { user: true, space: true },
    });
    // await this.notificationsService.sendReservationStatusUpdate(updatedReservation);
    return updatedReservation;
  }

  async delete(id: string): Promise<Reservation> {
    await this.findOne(id);
    const reservation = await this.prisma.reservation.delete({
      where: { id },
      include: { user: true, space: true },
    });
    // await this.notificationsService.sendReservationCancellation(reservation);
    return reservation;
  }
}
