import { DataSource } from 'typeorm';
import * as config from './ormconfig.json';

export default new DataSource(config as any);
