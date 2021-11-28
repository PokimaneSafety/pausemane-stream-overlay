import type { ConfigMap } from '../../loader-base';
import { ConfigLoaderBase } from '../../loader-base';
import type { IServiceHealthConfig } from './definition';

export class ConfigLoader extends ConfigLoaderBase<IServiceHealthConfig> {
    public load(map: ConfigMap): IServiceHealthConfig {
        return {
            host: this.parseString(map, 'HEALTH_HOST', '127.0.0.1'),
            path: this.parseString(map, 'HEALTH_PATH', '/healthz'),
            port: this.parseNumber(map, 'HEALTH_PORT', 4141),
            trustProxy: this.parseBoolean(map, 'HEALTH_TRUST_PROXY', false),
            uptime: this.parseBoolean(map, 'HEALTH_UPTIME', true),
        };
    }
}
