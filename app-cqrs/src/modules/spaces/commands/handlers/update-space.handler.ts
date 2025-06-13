import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateSpaceCommand } from '../update-space.command';
import { PrismaService } from '../../../../prisma/prisma.service';
import { SpaceUpdatedEvent } from '../../events/space-updated.event';
import { Injectable } from '@nestjs/common';
import { SpaceType } from '@prisma/client';

@Injectable()
@CommandHandler(UpdateSpaceCommand)
export class UpdateSpaceHandler implements ICommandHandler<UpdateSpaceCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateSpaceCommand) {
    const { id, name, description, capacity, type } = command;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (capacity) updateData.capacity = capacity;
    if (type) updateData.type = type;

    const space = await this.prisma.space.update({
      where: { id },
      data: updateData,
    });

    await this.eventBus.publish(new SpaceUpdatedEvent(space));

    return space;
  }
}
