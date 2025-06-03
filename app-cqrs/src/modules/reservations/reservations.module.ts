import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReservationsController } from './controllers/reservations.controller';
import { CreateReservationHandler } from './commands/handlers/create-reservation.handler';
import { UpdateReservationStatusHandler } from './commands/handlers/update-reservation-status.handler';
import { GetReservationHandler } from './queries/handlers/get-reservation.handler';
import { GetReservationsHandler } from './queries/handlers/get-reservations.handler';
import { ReservationCreatedHandler } from './events/handlers/reservation-created.handler';
import { ReservationStatusUpdatedHandler } from './events/handlers/reservation-status-updated.handler';
import { PrismaService } from '../../shared/services/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

const CommandHandlers = [CreateReservationHandler, UpdateReservationStatusHandler];

const QueryHandlers = [GetReservationHandler, GetReservationsHandler];

const EventHandlers = [ReservationCreatedHandler, ReservationStatusUpdatedHandler];

@Module({
  imports: [CqrsModule, NotificationsModule],
  controllers: [ReservationsController],
  providers: [PrismaService, ...CommandHandlers, ...QueryHandlers, ...EventHandlers],
})
export class ReservationsModule {}
