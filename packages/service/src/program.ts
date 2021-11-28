import * as Protocol from '@pokimane-safety/protocol';

import * as Config from './config';
import * as Health from './internal/health';
import * as Metrics from './internal/metrics';
import type { IService } from './internal/service';
import { Service } from './internal/service';
import * as Store from './internal/store';
import * as Twitch from './internal/twitch';
import * as WebSocket from './internal/websocket';

export class Program {
    private static _service: IService;

    public static Main() {
        const config = new Config.ConfigLoader().load();

        this._service = new Service(config, {
            health: new Health.HealthServer({
                path: config.health.path,
                trustProxy: config.health.trustProxy,
                uptime: config.health.uptime,
            }),
            metrics: {
                prometheus: new Metrics.Prometheus.MetricsServer({
                    path: config.metrics.path,
                    trustProxy: config.metrics.trustProxy,
                }),
            },
            store: new Store.PausemaneStore(),
            twitch: new Twitch.TwitchClient({
                room: config.twitch.room,
                token: config.twitch.token,
                user: config.twitch.user,
            }),
            websocket: new WebSocket.WebSocketServer({
                host: config.websocket.host,
                path: config.websocket.path,
                port: config.websocket.port,
                trustProxy: config.websocket.trustProxy,
                validator: (message): message is Protocol.IWebSocketPausesMessage => {
                    if (typeof message !== 'object' || !message) {
                        return false;
                    }
                    return Protocol.isMessage(message);
                },
            }),
        });
        this._RegisterHooks();
        this._Start();
    }

    private static _RegisterHooks() {
        process.once('SIGINT', () => this._Stop());
        process.once('SIGTERM', () => this._Stop());
    }

    private static async _Start() {
        await this._service.start();
    }

    private static async _Stop() {
        try {
            await this._service.stop();
        } finally {
            process.exit(0);
        }
    }
}
