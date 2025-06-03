import { User } from '@prisma/client';

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
