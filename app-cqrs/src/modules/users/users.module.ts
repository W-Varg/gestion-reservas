import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from './controllers/users.controller';
import { CreateUserHandler } from './handlers/create-user.handler';
import { GetUserHandler } from './handlers/get-user.handler';
import { PrismaModule } from '../../prisma/prisma.module';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [GetUserHandler];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [UsersController],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [...CommandHandlers, ...QueryHandlers],
})
export class UsersModule {}
