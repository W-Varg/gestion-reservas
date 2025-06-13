import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSpaceCommand } from '../create-space.command';
import { PrismaService } from '../../../../prisma/prisma.service';

@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateSpaceCommand) {
    const { name, description, capacity, type } = command;
    const space = await this.prisma.space.create({
      data: {
        name,
        description: description || '',
        capacity,
        type,
      },
    });
    return space;
  }
}
