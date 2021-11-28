import type { EntityManager } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/core';

import { EnsureDatabaseExists } from './helpers/ensure-database-exists';
import { COMMON_OPTIONS } from './orm/common';

export interface IDatabaseOptions {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
}

export class Database {
    protected static orm?: MikroORM;

    public static async initialise(options: IDatabaseOptions) {
        await EnsureDatabaseExists(options);

        this.orm = await MikroORM.init({
            ...COMMON_OPTIONS,
            dbName: options.database,
            host: options.host,
            password: options.password,
            port: options.port,
            resultCache: { expiration: 3000 },
            user: options.user,
        });

        await this.orm.getMigrator().up();
    }

    public static async close() {
        if (!this.orm) {
            return;
        }
        await this.orm.close();
    }

    public static get entityManager(): EntityManager {
        if (!this.orm) {
            throw new Error('Unable to get repository.');
        }
        return this.orm.em;
    }
}
