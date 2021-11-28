import type { ConfigMap } from '../../loader-base';
import { ConfigLoaderBase } from '../../loader-base';
import type { IServiceMetricsConfig } from './definition';

export class ConfigLoader extends ConfigLoaderBase<IServiceMetricsConfig> {
    public load(map: ConfigMap): IServiceMetricsConfig {
        return {
            host: this.parseString(map, 'METRICS_HOST', '127.0.0.1'),
            path: this.parseString(map, 'METRICS_PATH', '/metrics'),
            port: this.parseNumber(map, 'METRICS_PORT', 9090),
            trustProxy: this.parseBoolean(map, 'METRICS_TRUST_PROXY', false),
        };
    }
}
