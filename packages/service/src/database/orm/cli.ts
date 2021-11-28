import type * as MikroORM from '@mikro-orm/core';
import FS from 'fs';
import Path from 'path';
import Yaml from 'yaml';

import { ConfigLoader } from '../../config/paths/postgresql';
import { COMMON_OPTIONS } from './common';

interface IDockerComposeConfig {
    readonly services: {
        readonly [serviceName: string]: {
            readonly environment: Record<string, string>;
        };
    };
}

const path = Path.resolve(__dirname, '..', '..', '..', 'docker-compose.yaml');
const compose = Yaml.parse(FS.readFileSync(path, { encoding: 'utf-8' })) as IDockerComposeConfig;
const loader = new ConfigLoader();
const config = loader.load(compose.services['pausemane-stream-overlay'].environment);

const options: Partial<MikroORM.MikroORMOptions> = {
    ...COMMON_OPTIONS,
    dbName: config.database,
    host: 'localhost',
    password: config.password,
    port: config.port,
    user: config.user,
};

export default options;
