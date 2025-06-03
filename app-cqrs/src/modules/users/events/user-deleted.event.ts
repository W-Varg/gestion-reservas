import { User } from '@prisma/client';

export class UserDeletedEvent {
  constructor(public readonly user: User) {}
}
