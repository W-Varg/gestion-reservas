import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateSpaceCommand } from '../create-space.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { SpaceCreatedEvent } from '../../events/space-created.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateSpaceCommand) {
    const { name, description, capacity, location } = command;

    const space = await this.prisma.space.create({
      data: {
        name,
        description,
        capacity,
        location,
      },
    });

    await this.eventBus.publish(new SpaceCreatedEvent(space));

    return space;
  }
}
