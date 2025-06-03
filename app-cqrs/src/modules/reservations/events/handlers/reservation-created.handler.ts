import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReservationCreatedEvent } from '../reservation-created.event';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventsHandler(ReservationCreatedEvent)
export class ReservationCreatedHandler implements IEventHandler<ReservationCreatedEvent> {
  constructor(private readonly notificationsService: NotificationsService) {}

  async handle(event: ReservationCreatedEvent) {
    await this.notificationsService.sendReservationConfirmation(event.reservation);
  }
}
