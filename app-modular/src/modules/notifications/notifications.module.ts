import { NotificationsService } from './services/notifications.service';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../shared/services/prisma.service';
import { MailerConfigModule } from '../mailer/mailer.module';

@Module({
  imports: [MailerConfigModule],
  providers: [NotificationsService, PrismaService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
