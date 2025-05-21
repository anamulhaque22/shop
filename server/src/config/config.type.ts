import { AuthConfig } from 'src/auth/config/auth-config.type';
import { CloudinaryConfig } from 'src/cloudinary/config/cloudinay-config.type';
import { MailConfig } from 'src/mail/config/mail-config.types';

import { DatabaseConfig } from '../database/config/database-config.type';
import { AppConfig } from './app-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  mail: MailConfig;
  cloudinary: CloudinaryConfig;
};
