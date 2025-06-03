import { Reservation, User, Space } from '@prisma/client';

export class ReservationStatusUpdatedEvent {
  constructor(public readonly reservation: Reservation & { user: User; space: Space }) {}
}
