import { Injectable, Logger } from '@nestjs/common';
import { Reservation, User, Space } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateReservationDto } from 'src/modules/reservations/dto/create-reservation.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  sendReservationConfirmation(email: string): void {
    try {
      Logger.log(`Email de confirmación enviado a ${email}`);
    } catch {
      Logger.error(`Error al enviar email de confirmación`);
    }
  }

  sendReservationStatusUpdate(email: string): void {
    try {
      Logger.log(`Email de actualización de esado enviado a ${email}`);
    } catch (error) {
      Logger.error(`Error al enviar email de actualización: ${error.message}`);
    }
  }

  sendReservationCancellation(email: string): void {
    try {
      Logger.log(`Email de cancelación enviado a ${email}`);
    } catch (error) {
      Logger.error(`Error al enviar email de cancelación: ${error.message}`);
    }
  }
}
