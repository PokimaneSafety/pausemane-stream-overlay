import { BaseError } from 'make-error-cause';

import type { IHttpServer } from '../../server';

export class ListenError extends BaseError {
    public readonly server: IHttpServer;
    public readonly host: string;
    public readonly port: number;

    public constructor(server: IHttpServer, host: string, port: number, message?: string, cause?: Error) {
        super(message, cause);
        this.server = server;
        this.host = host;
        this.port = port;
    }
}
