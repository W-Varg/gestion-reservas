import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSpaceCommand } from '../commands/create-space.command';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpaceType } from '@prisma/client';

@CommandHandler(CreateSpaceCommand)
export class CreateSpaceHandler implements ICommandHandler<CreateSpaceCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: CreateSpaceCommand) {
    const { name, description, capacity, type } = command;
    const space = await this.prisma.space.create({
      data: {
        name,
        description: description ?? '',
        capacity,
        type: type as SpaceType,
      },
    });
    return space;
  }
} 