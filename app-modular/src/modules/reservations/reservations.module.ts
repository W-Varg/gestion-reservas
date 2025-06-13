import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../../common/database/prisma.service';
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
