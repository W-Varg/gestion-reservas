import { Reservation, User, Space } from '@prisma/client';

export class NotificationSentEvent {
  constructor(
    public readonly type: 'confirmation' | 'status_update' | 'cancellation',
    public readonly reservation: Reservation & { user: User; space: Space },
  ) {}
}
