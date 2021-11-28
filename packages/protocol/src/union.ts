import type { EWebSocketMessageType, IWebSocketMessage } from './message';
import type { IWebSocketPausesMessage } from './pauses/definition';

type WebSocketMessageMapValidator<T extends { [K in EWebSocketMessageType]: IWebSocketMessage<K> }> = T;
type WebSocketMessageMap = WebSocketMessageMapValidator<{
    [EWebSocketMessageType.PAUSES]: IWebSocketPausesMessage;
}>;

export type WebSocketMessage = WebSocketMessageMap[EWebSocketMessageType];
