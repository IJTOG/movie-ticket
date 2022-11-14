import { Injectable, Inject, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigServiceType } from './config.service';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(DatabaseConfig.name);

  constructor(@Inject('CONFIG') private config: ConfigServiceType) {
    this.logger.debug('Init DatabaseConfig');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV == 'test',
      entities: [path.join(__dirname, '..', '**/*.entity.{js,ts}')],
      cache: false,
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASS'),
      database: this.config.get('DB_NAME'),
    };
    return config;
  }
}
