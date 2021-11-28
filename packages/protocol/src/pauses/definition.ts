import type { EWebSocketMessageType, IWebSocketMessage } from '../message';

export interface IWebSocketPausesMessage extends IWebSocketMessage<EWebSocketMessageType.PAUSES> {
    readonly pauses: number;
}
