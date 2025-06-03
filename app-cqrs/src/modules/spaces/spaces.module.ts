import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../shared/services/prisma.service';
import { SpacesController } from './spaces.controller';

// Command Handlers
import { CreateSpaceHandler } from './commands/handlers/create-space.handler';
import { UpdateSpaceHandler } from './commands/handlers/update-space.handler';
import { DeleteSpaceHandler } from './commands/handlers/delete-space.handler';

// Query Handlers
import { GetSpaceHandler } from './queries/handlers/get-space.handler';
import { GetSpacesHandler } from './queries/handlers/get-spaces.handler';
import { GetSpaceAvailabilityHandler } from './queries/handlers/get-space-availability.handler';

const CommandHandlers = [CreateSpaceHandler, UpdateSpaceHandler, DeleteSpaceHandler];

const QueryHandlers = [GetSpaceHandler, GetSpacesHandler, GetSpaceAvailabilityHandler];

@Module({
  imports: [CqrsModule],
  controllers: [SpacesController],
  providers: [PrismaService, ...CommandHandlers, ...QueryHandlers],
})
export class SpacesModule {}
