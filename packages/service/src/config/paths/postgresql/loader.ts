import type { ConfigMap } from '../../loader-base';
import { ConfigLoaderBase } from '../../loader-base';
import type { IServicePostgreSqlConfig } from './definition';

export class ConfigLoader extends ConfigLoaderBase<IServicePostgreSqlConfig> {
    public load(map: ConfigMap): IServicePostgreSqlConfig {
        return {
            database: this.parseString(map, 'POSTGRESQL_DATABASE'),
            host: this.parseString(map, 'POSTGRESQL_HOST', 'localhost'),
            password: this.parseString(map, 'POSTGRESQL_PASSWORD', ''),
            port: this.parseNumber(map, 'POSTGRESQL_PORT', 5432),
            user: this.parseString(map, 'POSTGRESQL_USER', 'postgres'),
        };
    }
}
