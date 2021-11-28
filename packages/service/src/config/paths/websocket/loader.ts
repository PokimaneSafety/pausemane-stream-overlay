import type { ConfigMap } from '../../loader-base';
import { ConfigLoaderBase } from '../../loader-base';
import type { IServiceWebSocketConfig } from './definition';

export class ConfigLoader extends ConfigLoaderBase<IServiceWebSocketConfig> {
    public load(map: ConfigMap): IServiceWebSocketConfig {
        return {
            host: this.parseString(map, 'WEBSOCKET_HOST', '127.0.0.1'),
            path: this.parseString(map, 'WEBSOCKET_PATH', '/ws'),
            port: this.parseNumber(map, 'WEBSOCKET_PORT', 8080),
            trustProxy: this.parseBoolean(map, 'WEBSOCKET_TRUST_PROXY', false),
        };
    }
}
