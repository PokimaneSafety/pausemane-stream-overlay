import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';

import * as Errors from './errors';

export interface IHttpServer {
    readonly listening: boolean;
    listen(host: string, port: number): Promise<void>;
    close(): Promise<void>;
}

export interface IHttpServerConfiguration {
    trustProxy?: boolean;
}

export class HttpServer implements IHttpServer {
    private _listening = false;
    protected readonly _server: FastifyInstance;

    public constructor(config?: Readonly<IHttpServerConfiguration>) {
        this._server = Fastify({ trustProxy: config?.trustProxy ?? false });
    }

    public get listening() {
        return this._listening;
    }

    public async listen(host: string, port: number): Promise<void> {
        try {
            await this._server.listen({ host, port });
            this._listening = true;
        } catch (err) {
            throw new Errors.ListenError(this, host, port, `Error listening to ${host}:${port}`, err as Error);
        }
    }

    public async close(): Promise<void> {
        try {
            await this._server.close();
            this._listening = false;
        } catch (err) {
            throw new Errors.CloseError(this, 'Error closing server', err as Error);
        }
    }
}
