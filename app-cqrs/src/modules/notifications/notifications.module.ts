import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendNotificationHandler } from './commands/handlers/send-notification.handler';
import { NotificationSentHandler } from './events/handlers/notification-sent.handler';
import { MailerConfigModule } from '../mailer/mailer.module';
import { NotificationsService } from './services/notifications.service';

const CommandHandlers = [SendNotificationHandler];
const EventHandlers = [NotificationSentHandler];

@Module({
  imports: [CqrsModule, MailerConfigModule],
  providers: [NotificationsService, ...CommandHandlers, ...EventHandlers],
  exports: [NotificationsService],
})
export class NotificationsModule {}
