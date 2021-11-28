import type { IWebSocketMessage } from './message';
import { EWebSocketMessageType } from './message';
import type { WebSocketMessage } from './union';

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type LastOf<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => infer R ? R : never;
type Push<T extends unknown[], V> = [...T, V];
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
    ? []
    : Push<TuplifyUnion<Exclude<T, L>>, L>;

type WebSocketMessageTuple = TuplifyUnion<EWebSocketMessageType>;
const MESSAGE_TYPES: WebSocketMessageTuple = [EWebSocketMessageType.PAUSES];

const MESSAGE_TYPES_SET = new Set(MESSAGE_TYPES);
export function isMessage(message: object): message is WebSocketMessage {
    if (!('type' in message)) {
        return false;
    }
    const type = (message as IWebSocketMessage).type;
    return MESSAGE_TYPES_SET.has(type);
}
