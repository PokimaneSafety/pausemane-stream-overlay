import * as PostgreSql from 'pg';

export interface IConnectionConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database?: string;
}

async function Sleep(duration: number) {
    await new Promise<void>((resolve) => {
        setTimeout(resolve, duration);
    });
}

async function Connect(config: IConnectionConfig, context?: (client: PostgreSql.Client) => Promise<void> | void) {
    const client = new PostgreSql.Client(config);
    try {
        await client.connect();
        await context?.(client);
    } finally {
        await client.end();
    }
}

export async function EnsureDatabaseExists(config: IConnectionConfig): Promise<void> {
    try {
        await Connect(config);
    } catch (err) {
        interface IDatabaseError extends Error {
            readonly code?: string;
        }

        if ((err as IDatabaseError).code === '3D000') {
            await Connect({ ...config, database: undefined }, async (client) => {
                await client.query(`CREATE DATABASE "${config.database}";`);
            });
            return;
        }

        await Sleep(500);
        return EnsureDatabaseExists(config);
    }
}
