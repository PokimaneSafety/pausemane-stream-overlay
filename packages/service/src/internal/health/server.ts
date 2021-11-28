import UnderPressure from 'under-pressure';

import * as Http from '../http';

export type IHealthServer = Http.IHttpServer;

export interface IHealthServerConfiguration extends Http.IHttpServerConfiguration {
    path: string;
    uptime?: boolean;
}

export class HealthServer extends Http.HttpServer implements IHealthServer {
    public static readonly OK: Record<string, unknown> = { status: 'ok', statusCode: 200 };

    public constructor(config: Readonly<IHealthServerConfiguration>) {
        super(config);
        this._server.register(UnderPressure);
        this._server.get(config.path, async (request, reply) => {
            const response = { ...HealthServer.OK };
            if (config.uptime) {
                response.uptime = process.uptime();
            }
            await reply.code(200).send(response);
        });
    }
}
