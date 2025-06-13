import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../prisma/prisma.module';
import { ReservationsController } from './controllers/reservations.controller';
import { CreateReservationHandler } from './handlers/create-reservation.handler';
import { GetReservationHandler } from './handlers/get-reservation.handler';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ReservationsController],
  providers: [CreateReservationHandler, GetReservationHandler],
})
export class ReservationsModule {}
