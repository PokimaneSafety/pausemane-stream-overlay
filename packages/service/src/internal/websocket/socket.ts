import type * as WS from 'ws';

export interface IWebSocket {
    send(message: object): void;
    close(code?: number): void;
    destroy(): void;
}

export interface IWebSocketConfiguration {
    webSocket: WS.WebSocket;
}

export class WebSocket implements IWebSocket {
    protected _webSocket: WS.WebSocket;

    public constructor(config: IWebSocketConfiguration) {
        this._webSocket = config.webSocket;
    }

    public send(message: object) {
        const marshalled = JSON.stringify(message);
        this._webSocket.send(marshalled);
    }

    public close(code?: number) {
        this._webSocket.close(code);
    }

    public destroy() {
        this._webSocket.terminate();
    }
}
