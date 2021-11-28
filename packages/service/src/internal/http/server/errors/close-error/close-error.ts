import { BaseError } from 'make-error-cause';

import type { IHttpServer } from '../../server';

export class CloseError extends BaseError {
    public readonly server: IHttpServer;

    public constructor(server: IHttpServer, message?: string, cause?: Error) {
        super(message, cause);
        this.server = server;
    }
}
