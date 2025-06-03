import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from './modules/users/users.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MailerConfigModule } from './modules/notifications/mailer-config.module';
import { SpacesModule } from './modules/spaces/spaces.module';
import configuration from './common/configurations/configuration';
import { PrismaService } from './shared/services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CqrsModule,
    UsersModule,
    ReservationsModule,
    NotificationsModule,
    MailerConfigModule,
    SpacesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
