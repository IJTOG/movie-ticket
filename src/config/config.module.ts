import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

const nodeEnv = process.env.NODE_ENV || 'development';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: [
        `${nodeEnv}.env`,
        `.env.${nodeEnv}.local`,
        `.env.${nodeEnv}`,
      ],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
