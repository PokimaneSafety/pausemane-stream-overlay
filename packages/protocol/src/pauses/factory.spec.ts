import { EWebSocketMessageType } from '../message';
import type { IWebSocketPausesMessage } from './definition';
import { WebSocketPausesMessageFactory } from './factory';

describe('Protocol/Pauses/WebSocketPausesMessageFactory', () => {
    it('Should create a valid message', () => {
        const pauses = 30;
        const expected: IWebSocketPausesMessage = {
            pauses,
            type: EWebSocketMessageType.PAUSES,
        };
        const message = WebSocketPausesMessageFactory.create(pauses);
        expect(message).toMatchObject(expected);
    });
});
