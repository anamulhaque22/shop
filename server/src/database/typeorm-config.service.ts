import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { AllConfigType } from '../config/config.type';
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}

  // createTypeOrmOptions(): TypeOrmModuleOptions {
  //   return {
  //     type: this.configService.get('database.type', { infer: true }),
  //     host: this.configService.get('database.host', { infer: true }),
  //     port: this.configService.get('database.port', { infer: true }),
  //     username: this.configService.get('database.username', { infer: true }),
  //     password: this.configService.get('database.password', { infer: true }),
  //     database: this.configService.get('database.name', { infer: true }),
  //     synchronize: this.configService.get('database.synchronize', {
  //       infer: true,
  //     }),
  //     dropSchema: false,
  //     keepConnectionAlive: true,
  //     logging:
  //       this.configService.get('app.nodeEnv', { infer: true }) !== 'production',
  //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //     migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  //     cli: {
  //       entitiesDir: 'src',

  //       subscribersDir: 'subscriber',
  //     },
  //     ssl: true,
  //     extra: {
  //       ssl: {
  //         rejectUnauthorized: false, // Disable strict SSL validation
  //       },
  //     },
  //   } as TypeOrmModuleOptions;
  // }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      migrationsRun: true,
      logging:
        this.configService.get<string>('app.nodeEnv', { infer: true }) !==
        'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      extra: {
        ssl: {
          ca: fs
            .readFileSync(path.join(__dirname, '../../ca-certificate.pem'))
            .toString(),
          rejectUnauthorized: true,
        },
      },
    };
  }
}
