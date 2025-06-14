import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { SpacesController } from './controllers/spaces.controller';

// Command Handlers
import { CreateSpaceHandler } from './handlers/create-space.handler';
import { UpdateSpaceHandler } from './commands/handlers/update-space.handler';
import { DeleteSpaceHandler } from './commands/handlers/delete-space.handler';

// Query Handlers
import { GetSpaceHandler } from './handlers/get-space.handler';
import { GetAllSpacesHandler } from './handlers/get-all-spaces.handler';
import { GetSpacesHandler } from './queries/handlers/get-spaces.handler';
import { GetSpaceAvailabilityHandler } from './queries/handlers/get-space-availability.handler';

const CommandHandlers = [CreateSpaceHandler, UpdateSpaceHandler, DeleteSpaceHandler];
const QueryHandlers = [
  GetSpaceHandler,
  GetAllSpacesHandler,
  GetSpacesHandler,
  GetSpaceAvailabilityHandler,
];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [SpacesController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class SpacesModule {}
