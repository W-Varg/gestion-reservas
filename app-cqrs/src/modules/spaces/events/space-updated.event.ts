import { Space } from '@prisma/client';

export class SpaceUpdatedEvent {
  constructor(public readonly space: Space) {}
}
