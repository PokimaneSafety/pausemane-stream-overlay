import type * as MikroORM from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as Path from 'path';

const ENTITY_PATHS = ['entity', '*.entity', 'entities/**/*', 'entity/**/*'].map((k) =>
    Path.resolve(__dirname, '../../**/', k)
);

export const COMMON_OPTIONS: Partial<MikroORM.MikroORMOptions> = {
    entities: ENTITY_PATHS.map((p) => p + '.js'),
    entitiesTs: ENTITY_PATHS.map((p) => p + '.ts'),
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
        allOrNothing: true,
        dropTables: true,
        emit: 'ts',
        path: Path.resolve(__dirname, '../', 'migrations'),
        pattern: /^[\w-]+\d+\.[jt]s$/,
        safe: false,
        tableName: 'migrations',
        transactional: true,
    },
    type: 'postgresql',
};
