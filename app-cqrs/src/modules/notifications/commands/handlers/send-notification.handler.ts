import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../send-notification.command';
import { NotificationSentEvent } from '../../events/notification-sent.event';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler implements ICommandHandler<SendNotificationCommand> {
  constructor(
    private readonly mailerService: MailerService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: SendNotificationCommand) {
    const { type, reservation } = command;

    try {
      let subject: string;
      let html: string;

      switch (type) {
        case 'confirmation':
          subject = 'Confirmación de Reserva';
          html = this.getConfirmationTemplate(reservation);
          break;
        case 'status_update':
          subject = 'Actualización de Estado de Reserva';
          html = this.getStatusUpdateTemplate(reservation);
          break;
        case 'cancellation':
          subject = 'Cancelación de Reserva';
          html = this.getCancellationTemplate(reservation);
          break;
      }

      await this.mailerService.sendMail({
        to: reservation.user.email,
        subject,
        html,
      });

      Logger.log(`Email de ${type} enviado a ${reservation.user.email}`);
      this.eventBus.publish(new NotificationSentEvent(type, reservation));
    } catch (error) {
      Logger.error(`Error al enviar email de ${type}: ${error.message}`);
      throw error;
    }
  }

  private getConfirmationTemplate(reservation: any): string {
    return `
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
    `;
  }

  private getStatusUpdateTemplate(reservation: any): string {
    return `
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
    `;
  }

  private getCancellationTemplate(reservation: any): string {
    return `
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
    `;
  }
}
