import { Injectable, Logger } from '@nestjs/common';
import { Reservation, User, Space } from '@prisma/client';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendReservationConfirmation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    // En un entorno real, aquí se implementaría el envío de email
    // Por ahora, solo simulamos el envío con un log
    this.logger.log(`Enviando confirmación de reserva a ${reservation.user.email}`);
    this.logger.log(
      `Detalles de la reserva:
      - Espacio: ${reservation.space.name}
      - Fecha: ${reservation.date}
      - Hora inicio: ${reservation.startTime}
      - Hora fin: ${reservation.endTime}
      - Estado: ${reservation.status}`,
    );
  }

  async sendReservationStatusUpdate(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    this.logger.log(`Enviando actualización de estado a ${reservation.user.email}`);
    this.logger.log(
      `La reserva para el espacio ${reservation.space.name} ha sido ${reservation.status.toLowerCase()}`,
    );
  }

  async sendReservationCancellation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    this.logger.log(`Enviando notificación de cancelación a ${reservation.user.email}`);
    this.logger.log(`La reserva para el espacio ${reservation.space.name} ha sido cancelada`);
  }
}
