import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../update-user.command';
import { PrismaService } from '../../../../shared/services/prisma.service';
import { UserUpdatedEvent } from '../../events/user-updated.event';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, email, name, password, role } = command;

    const updateData: Partial<User> = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (role) updateData.role = role;

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
