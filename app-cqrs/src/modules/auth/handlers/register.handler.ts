import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../commands/register.command';
import { PrismaService } from '../../../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(command: RegisterCommand) {
    const { email, password, name } = command;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return user;
  }
}
