import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations.service';
import { PrismaService } from '../../shared/services/prisma.service';
import { UsersModule } from '../users/users.module';
import { SpacesModule } from '../spaces/spaces.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [UsersModule, SpacesModule, NotificationsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, PrismaService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
