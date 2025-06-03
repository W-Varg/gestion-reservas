import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { SpacesModule } from './modules/spaces/spaces.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PrismaService } from './shared/services/prisma.service';
import configuration from './common/configurations/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UsersModule,
    SpacesModule,
    ReservationsModule,
    NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
