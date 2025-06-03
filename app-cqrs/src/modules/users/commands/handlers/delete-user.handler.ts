import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from '../delete-user.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { UserDeletedEvent } from '../../events/user-deleted.event';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand) {
    const { id } = command;

    const user = await this.prisma.user.delete({
      where: { id },
    });

    this.eventBus.publish(new UserDeletedEvent(user));

    return user;
  }
}
