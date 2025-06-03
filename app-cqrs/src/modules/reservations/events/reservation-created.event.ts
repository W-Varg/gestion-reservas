import { Reservation, User, Space } from '@prisma/client';

export class ReservationCreatedEvent {
  constructor(public readonly reservation: Reservation & { user: User; space: Space }) {}
}
