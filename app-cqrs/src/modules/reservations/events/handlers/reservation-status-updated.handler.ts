import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReservationStatusUpdatedEvent } from '../reservation-status-updated.event';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@EventsHandler(ReservationStatusUpdatedEvent)
export class ReservationStatusUpdatedHandler
  implements IEventHandler<ReservationStatusUpdatedEvent>
{
  constructor(private readonly notificationsService: NotificationsService) {}

  async handle(event: ReservationStatusUpdatedEvent) {
    await this.notificationsService.sendReservationStatusUpdate(event.reservation);
  }
}
