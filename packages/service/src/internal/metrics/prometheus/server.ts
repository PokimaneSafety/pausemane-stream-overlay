import FastifyMetrics from 'fastify-metrics';

import * as Http from '../../http';

export type IMetricsServer = Http.IHttpServer;

export interface IMetricsServerConfiguration extends Http.IHttpServerConfiguration {
    path: string;
}

export class MetricsServer extends Http.HttpServer implements IMetricsServer {
    public constructor(config: Readonly<IMetricsServerConfiguration>) {
        super(config);
        this._server.register(FastifyMetrics, {
            enableDefaultMetrics: true,
            enableRouteMetrics: false,
            endpoint: config.path,
        });
    }
}
