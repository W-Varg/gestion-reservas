import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateSpaceCommand } from '../update-space.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { SpaceUpdatedEvent } from '../../events/space-updated.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(UpdateSpaceCommand)
export class UpdateSpaceHandler implements ICommandHandler<UpdateSpaceCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateSpaceCommand) {
    const { id, name, description, capacity, location } = command;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (capacity) updateData.capacity = capacity;
    if (location) updateData.location = location;

    const space = await this.prisma.space.update({
      where: { id },
      data: updateData,
    });

    await this.eventBus.publish(new SpaceUpdatedEvent(space));

    return space;
  }
}
