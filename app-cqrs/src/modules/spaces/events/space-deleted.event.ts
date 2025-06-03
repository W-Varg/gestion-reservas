import { Space } from '@prisma/client';

export class SpaceDeletedEvent {
  constructor(public readonly space: Space) {}
}
