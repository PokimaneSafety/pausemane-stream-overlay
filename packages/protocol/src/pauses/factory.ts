import { EWebSocketMessageType } from '../message';
import type { IWebSocketPausesMessage } from './definition';

export class WebSocketPausesMessageFactory {
    public static create(pauses: number): IWebSocketPausesMessage {
        return {
            pauses,
            type: EWebSocketMessageType.PAUSES,
        };
    }
}
