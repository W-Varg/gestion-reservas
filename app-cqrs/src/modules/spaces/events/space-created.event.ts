import { Space } from '@prisma/client';

export class SpaceCreatedEvent {
  constructor(public readonly space: Space) {}
}
