import type { ConfigMap } from './loader-base';
import { ConfigLoaderBase } from './loader-base';
import * as Health from './paths/health';
import * as Metrics from './paths/metrics';
import * as PostgreSql from './paths/postgresql';
import * as Twitch from './paths/twitch';
import * as WebSocket from './paths/websocket';

export interface IServiceConfig {
    readonly health: Health.IServiceHealthConfig;
    readonly metrics: Metrics.IServiceMetricsConfig;
    readonly postgresql: PostgreSql.IServicePostgreSqlConfig;
    readonly twitch: Twitch.IServiceTwitchConfig;
    readonly websocket: WebSocket.IServiceWebSocketConfig;
}

export class ConfigLoader extends ConfigLoaderBase<IServiceConfig> {
    public load(map: ConfigMap = process.env as ConfigMap): IServiceConfig {
        return {
            health: new Health.ConfigLoader().load(map),
            metrics: new Metrics.ConfigLoader().load(map),
            postgresql: new PostgreSql.ConfigLoader().load(map),
            twitch: new Twitch.ConfigLoader().load(map),
            websocket: new WebSocket.ConfigLoader().load(map),
        };
    }
}
