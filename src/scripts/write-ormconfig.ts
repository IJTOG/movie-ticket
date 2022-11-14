/* istanbul ignore file */
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseConfig } from '@src/config/database';
import { TestingModule, Test } from '@nestjs/testing';
import { ConfigModule } from '@src/config/config.module';

async function bootstrap() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [ConfigModule],
    providers: [DatabaseConfig],
  }).compile();

  const databaseConfig = module.get<DatabaseConfig>(DatabaseConfig);

  try {
    fs.unlinkSync('ormconfig.json');
  } catch {}

  const ormconfig = databaseConfig.createTypeOrmOptions() as any;

  ormconfig['migrations'] = [
    path.join(__dirname, '../db/migrations/**/*{.js,.ts}'),
  ];
  ormconfig['cli'] = { migrationsDir: 'migrations' };
  ormconfig['synchronize'] = undefined;

  fs.writeFileSync('ormconfig.json', JSON.stringify(ormconfig, null, 2));

  await module.close();
}

bootstrap();
