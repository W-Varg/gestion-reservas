import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NotificationSentEvent } from '../notification-sent.event';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
@EventsHandler(NotificationSentEvent)
export class NotificationSentHandler implements IEventHandler<NotificationSentEvent> {
  private readonly logger = new Logger(NotificationSentHandler.name);

  async handle(event: NotificationSentEvent) {
    const { type, reservation } = event;
    this.logger.log(
      `Notificación de tipo ${type} enviada para la reserva ${reservation.id} al usuario ${reservation.user.email}`,
    );
  }
}
