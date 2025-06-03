import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../shared/services/prisma.service';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';
import { GetUserHandler } from './queries/handlers/get-user.handler';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { UsersController } from './users.controller';

const CommandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

const QueryHandlers = [GetUserHandler, GetUsersHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [PrismaService, ...CommandHandlers, ...QueryHandlers],
})
export class UsersModule {}
