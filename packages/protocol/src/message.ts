export enum EWebSocketMessageType {
    PAUSES = 'PAUSES',
}

export interface IWebSocketMessage<Type extends EWebSocketMessageType = EWebSocketMessageType> {
    readonly type: Type;
}
