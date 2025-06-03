import { Injectable, Logger } from '@nestjs/common';
import { Reservation, User, Space } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendReservationConfirmation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: reservation.user.email,
        subject: 'Confirmación de Reserva',
        html: `
          <h1>¡Tu reserva ha sido confirmada!</h1>
          <p>Hola ${reservation.user.name},</p>
          <p>Tu reserva ha sido confirmada con los siguientes detalles:</p>
          <ul>
            <li><strong>Espacio:</strong> ${reservation.space.name}</li>
            <li><strong>Fecha:</strong> ${reservation.date.toLocaleDateString()}</li>
            <li><strong>Hora inicio:</strong> ${reservation.startTime.toLocaleTimeString()}</li>
            <li><strong>Hora fin:</strong> ${reservation.endTime.toLocaleTimeString()}</li>
            <li><strong>Estado:</strong> ${reservation.status}</li>
          </ul>
          <p>Gracias por usar nuestro sistema de reservas.</p>
        `,
      });
      this.logger.log(`Email de confirmación enviado a ${reservation.user.email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de confirmación: ${error.message}`);
    }
  }

  async sendReservationStatusUpdate(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: reservation.user.email,
        subject: 'Actualización de Estado de Reserva',
        html: `
          <h1>Actualización de Estado de Reserva</h1>
          <p>Hola ${reservation.user.name},</p>
          <p>El estado de tu reserva ha sido actualizado:</p>
          <ul>
            <li><strong>Espacio:</strong> ${reservation.space.name}</li>
            <li><strong>Nuevo Estado:</strong> ${reservation.status}</li>
            <li><strong>Fecha:</strong> ${reservation.date.toLocaleDateString()}</li>
            <li><strong>Hora inicio:</strong> ${reservation.startTime.toLocaleTimeString()}</li>
            <li><strong>Hora fin:</strong> ${reservation.endTime.toLocaleTimeString()}</li>
          </ul>
        `,
      });
      this.logger.log(`Email de actualización enviado a ${reservation.user.email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de actualización: ${error.message}`);
    }
  }

  async sendReservationCancellation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: reservation.user.email,
        subject: 'Cancelación de Reserva',
        html: `
          <h1>Reserva Cancelada</h1>
          <p>Hola ${reservation.user.name},</p>
          <p>Tu reserva ha sido cancelada:</p>
          <ul>
            <li><strong>Espacio:</strong> ${reservation.space.name}</li>
            <li><strong>Fecha:</strong> ${reservation.date.toLocaleDateString()}</li>
            <li><strong>Hora inicio:</strong> ${reservation.startTime.toLocaleTimeString()}</li>
            <li><strong>Hora fin:</strong> ${reservation.endTime.toLocaleTimeString()}</li>
          </ul>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        `,
      });
      this.logger.log(`Email de cancelación enviado a ${reservation.user.email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de cancelación: ${error.message}`);
    }
  }
}
