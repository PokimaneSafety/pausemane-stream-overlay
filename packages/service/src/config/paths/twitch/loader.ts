import type { ConfigMap } from '../../loader-base';
import { ConfigLoaderBase } from '../../loader-base';
import type { IServiceTwitchConfig } from './definition';

export class ConfigLoader extends ConfigLoaderBase<IServiceTwitchConfig> {
    public load(map: ConfigMap): IServiceTwitchConfig {
        return {
            room: this.parseString(map, 'TWITCH_ROOM'),
            token: this.parseString(map, 'TWITCH_TOKEN'),
            user: this.parseString(map, 'TWITCH_USER'),
        };
    }
}
