import { env } from '@/env.mjs';
import { isDev } from '@/utils';
import { createTransport } from 'nodemailer';
import type { Transporter } from 'nodemailer';

type EmailParams = {
  email: string;
  subject: string;
  html: string;
};

export default class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      secure: true,
    });
  }

  async sendTransactionalEmail(params: EmailParams) {
    try {
      await this.transporter.sendMail({
        from: 'Swatchr App <support@swatchr.app>',
        to: params.email,
        subject: params.subject,
        html: params.html,
        headers: {
          // Set this to prevent Gmail from threading emails.
          // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
          'X-Entity-Ref-ID': new Date().getTime().toString(),
        },
      });
      isDev && console.log('Transactional email sent successfully');
    } catch (error) {
      console.error('Error sending transactional email:', error);
    }
  }

  async sendAdminEmail(params: Omit<EmailParams, 'email'>) {
    try {
      await this.transporter.sendMail({
        from: 'Swatchr App <support@swatchr.app>',
        to: env.ADMIN_EMAIL,
        subject: params.subject,
        html: params.html,
        headers: {
          // Set this to prevent Gmail from threading emails.
          // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
          'X-Entity-Ref-ID': new Date().getTime().toString(),
        },
      });
      isDev && console.log('Admin email sent successfully');
    } catch (error) {
      console.error('Error sending admin email:', error);
    }
  }
}
