import * as WS from 'ws';

import type { IWebSocket } from './socket';
import { WebSocket } from './socket';

export type WebSocketOpenHandler = (socket: IWebSocket) => void;
export type WebSocketMessageHandler<MessageTypes> = (message: MessageTypes, socket: IWebSocket) => void;
export type WebSocketMessageValidator<MessageTypes> = (message: unknown) => message is MessageTypes;

export interface IWebSocketServer<MessageTypes> {
    readonly listening: boolean;
    broadcast(message: MessageTypes): void;
    addOnOpenHandler(handler: WebSocketOpenHandler): void;
    removeOnOpenHandler(handler: WebSocketOpenHandler): void;
    addOnMessageHandler(handler: WebSocketMessageHandler<MessageTypes>): void;
    removeOnMessageHandler(handler: WebSocketMessageHandler<MessageTypes>): void;
    close(): Promise<void>;
}

export interface IWebSocketServerConfiguration<MessageTypes> {
    host: string;
    port: number;
    path: string;
    trustProxy: boolean;
    validator: WebSocketMessageValidator<MessageTypes>;
}

export class WebSocketServer<MessageTypes> implements IWebSocketServer<MessageTypes> {
    private _listening = false;
    protected readonly _validator: WebSocketMessageValidator<MessageTypes>;
    protected readonly _server: WS.Server;
    protected readonly _openHandlers = new Set<WebSocketOpenHandler>();
    protected readonly _messageHandlers = new Set<WebSocketMessageHandler<MessageTypes>>();

    public constructor(config: Readonly<IWebSocketServerConfiguration<MessageTypes>>) {
        this._validator = config.validator;
        this._server = new WS.Server({
            host: config.host,
            path: config.path,
            port: config.port,
        });
        this._server.on('connection', (socket) => {
            socket.on('message', (message) => this._onMessage(socket, message.toString()));
            this._onOpen(socket);
        });
    }

    public get listening() {
        return this._listening;
    }

    public broadcast(message: MessageTypes): void {
        const marshalled = JSON.stringify(message);
        this._server.clients.forEach((socket) => socket.send(marshalled));
    }

    public addOnOpenHandler(handler: WebSocketOpenHandler) {
        this._openHandlers.add(handler);
    }

    public removeOnOpenHandler(handler: WebSocketOpenHandler) {
        this._openHandlers.delete(handler);
    }

    public addOnMessageHandler(handler: WebSocketMessageHandler<MessageTypes>) {
        this._messageHandlers.add(handler);
    }

    public removeOnMessageHandler(handler: WebSocketMessageHandler<MessageTypes>) {
        this._messageHandlers.delete(handler);
    }

    public async close(): Promise<void> {
        if (!this._server) {
            throw new Error('Unable to close server.');
        }

        await new Promise<void>((resolve) => {
            this._server.close(() => resolve());
        });
    }

    private _onOpen = (raw: WS.WebSocket) => {
        const socket = new WebSocket({ webSocket: raw });
        this._openHandlers.forEach((handler) => {
            handler(socket);
        });
    };

    private _onMessage = (raw: WS.WebSocket, message: string) => {
        let parsed: unknown;
        try {
            parsed = JSON.parse(String(message)) as unknown;
        } catch (err) {
            console.error(`Error parsing message: ${(err as Error).stack}`);
            return;
        }

        if (!parsed) {
            return;
        }

        // Not a valid message
        if (this._validator(parsed)) {
            const socket = new WebSocket({ webSocket: raw });
            this._messageHandlers.forEach((handler) => {
                handler(parsed as MessageTypes, socket);
            });
        }
    };
}
