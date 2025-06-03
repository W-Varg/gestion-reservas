import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../commands/send-notification.command';
import { Reservation, User, Space } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private readonly commandBus: CommandBus) {}

  async sendReservationConfirmation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    await this.commandBus.execute(new SendNotificationCommand('confirmation', reservation));
  }

  async sendReservationStatusUpdate(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    await this.commandBus.execute(new SendNotificationCommand('status_update', reservation));
  }

  async sendReservationCancellation(
    reservation: Reservation & { user: User; space: Space },
  ): Promise<void> {
    await this.commandBus.execute(new SendNotificationCommand('cancellation', reservation));
  }
}
