import { EWebSocketMessageType } from '../message';
import type { WebSocketMessage } from '../union';
import type { IWebSocketPausesMessage } from './definition';

export function isPausesMessage(message: WebSocketMessage): message is IWebSocketPausesMessage {
    return message.type === EWebSocketMessageType.PAUSES;
}
