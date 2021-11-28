import * as Protocol from '@pokimane-safety/protocol';

import type * as Config from '../config';
import { Database } from '../database';
import type * as Health from './health';
import type * as Metrics from './metrics';
import type * as Store from './store';
import type * as Twitch from './twitch';
import type * as WebSocket from './websocket';

export interface IServiceDependencies {
    readonly health: Health.IHealthServer;
    readonly metrics: {
        readonly prometheus: Metrics.Prometheus.IMetricsServer;
    };
    readonly websocket: WebSocket.IWebSocketServer<Protocol.WebSocketMessage>;
    readonly twitch: Twitch.ITwitchClient;
    readonly store: Store.IPausemaneStore;
}

export interface IService {
    readonly dependencies: IServiceDependencies;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export class Service implements IService {
    private readonly _config: Config.IServiceConfig;
    private readonly _dependencies: IServiceDependencies;

    public constructor(config: Config.IServiceConfig, dependencies: IServiceDependencies) {
        this._config = config;
        this._dependencies = dependencies;

        /**
         * Listen for twitch commands
         */
        this._dependencies.twitch.addCommand(
            'pause',
            async ({ room, sender }) => {
                try {
                    console.log('Attempting to add a pause...');
                    await this._dependencies.store.pause(this._config.twitch.room);
                } catch (err) {
                    console.error(`An error occurred updating pause count: ${(err as Error).stack}`);
                    try {
                        await this._dependencies.twitch.say(room, `@${sender} An error occurred. Please try again.`);
                    } catch (err) {
                        console.error(`An error occurred replying on twitch: ${(err as Error).stack}`);
                    }
                    return;
                }

                console.log('Successfully added a pause');
            },
            { cooldown: 10, mod: true }
        );
        this._dependencies.twitch.addCommand(
            'pausereset',
            async ({ room, sender }) => {
                try {
                    console.log('Attempting to reset the pause count...');
                    await this._dependencies.store.reset(this._config.twitch.room);
                } catch (err) {
                    console.error(`An error occurred clearing pause count: ${(err as Error).stack}`);
                    try {
                        await this._dependencies.twitch.say(room, `@${sender} An error occurred. Please try again.`);
                    } catch (err) {
                        console.error(`An error occurred replying on twitch: ${(err as Error).stack}`);
                    }
                    return;
                }

                console.log('Successfully reset the pause count');
            },
            { cooldown: 3, mod: true }
        );
        this._dependencies.twitch.addCommand(
            'pausecount',
            async ({ room, sender }) => {
                let count: number;
                try {
                    console.log('Attempting to fetch the pause count...');
                    count = await this._dependencies.store.retrieve(this._config.twitch.room);
                } catch (err) {
                    console.error(`An error occurred fetching the pause count: ${(err as Error).stack}`);
                    try {
                        await this._dependencies.twitch.say(room, `@${sender} An error occurred. Please try again.`);
                    } catch (err) {
                        console.error(`An error occurred replying on twitch: ${(err as Error).stack}`);
                    }
                    return;
                }

                try {
                    await this._dependencies.twitch.say(room, `@${sender} The pause count is ${count}.`);
                } catch (err) {
                    console.error(`An error occurred replying on twitch: ${(err as Error).stack}`);
                }
            },
            { cooldown: 1, mod: true }
        );

        /**
         * Provide real time updates to sockets.
         */
        this._dependencies.store.subscribe((count) => {
            console.log(`Emitting to websocket pause count = ${count}`);
            this._dependencies.websocket.broadcast(Protocol.WebSocketPausesMessageFactory.create(count));
        });

        /**
         * Send the current pause count when a new socket connects.
         */
        this._dependencies.websocket.addOnOpenHandler(async (socket) => {
            let count = 0;
            try {
                count = await this._dependencies.store.retrieve(this._config.twitch.room);
            } catch (err) {
                console.error(`Error retrieving pause count: ${(err as Error).stack}`);
            }

            console.log(`Emitting to new websocket client pause count = ${count}`);
            socket.send(Protocol.WebSocketPausesMessageFactory.create(count));
        });
    }

    public get dependencies() {
        return this._dependencies;
    }

    public async start() {
        await Database.initialise({
            database: this._config.postgresql.database,
            host: this._config.postgresql.host,
            password: this._config.postgresql.password,
            port: this._config.postgresql.port,
            user: this._config.postgresql.user,
        });
        await this._dependencies.twitch.connect();
        await this._dependencies.metrics.prometheus.listen(this._config.metrics.host, this._config.metrics.port);
        await this._dependencies.health.listen(this._config.health.host, this._config.health.port);
    }

    public async stop() {
        await this._dependencies.health.close();
        await this._dependencies.metrics.prometheus.close();
        this._dependencies.twitch.destroy();
        await this._dependencies.websocket.close();
        await Database.close();
    }
}
