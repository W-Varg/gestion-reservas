import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteSpaceCommand } from '../delete-space.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { SpaceDeletedEvent } from '../../events/space-deleted.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(DeleteSpaceCommand)
export class DeleteSpaceHandler implements ICommandHandler<DeleteSpaceCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteSpaceCommand) {
    const { id } = command;

    const space = await this.prisma.space.delete({
      where: { id },
    });

    await this.eventBus.publish(new SpaceDeletedEvent(space));

    return space;
  }
}
