import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
