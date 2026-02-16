import { BadRequestException, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { envConfig } from 'src/config/envs';
import { BatchEmail, Email } from './interfaces/emails.interface';
import { APP_NAME } from 'src/config/constants';

@Injectable()
export class EmailsService {
  private readonly resend: Resend;

  constructor() {
    this.resend = new Resend(envConfig.RESEND_API_KEY);
  }

  private readonly generateEmail = (email: Email) => ({
    from: `${APP_NAME} <${envConfig.RESEND_FROM_EMAIL}>`,
    ...email,
  });

  async sendEmail({ to, subject, html }: Email) {
    try {
      const response = await this.resend.emails.send(
        this.generateEmail({ to, subject, html }),
      );
      return response;
    } catch (e) {
      console.error('Error sending email:', e);
      throw new BadRequestException('Failed to send email');
    }
  }

  async sendBatchEmails(emails: BatchEmail) {
    try {
      const response = await this.resend.batch.send(
        emails.map(({ to, subject, html }) =>
          this.generateEmail({ to, subject, html }),
        ),
      );
      return response;
    } catch (error) {
      console.error('Error sending batch emails:', error);
      throw new BadRequestException('Failed to send batch emails');
    }
  }
}
