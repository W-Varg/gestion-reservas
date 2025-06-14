import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { ReservationsController } from './controllers/reservations.controller';
import { CreateReservationHandler } from './handlers/create-reservation.handler';

const CommandHandlers = [CreateReservationHandler];

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ReservationsController],
  providers: [...CommandHandlers],
})
export class ReservationsModule {}
