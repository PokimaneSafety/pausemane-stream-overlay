export type ConfigMap = Record<string, string>;

export abstract class ConfigLoaderBase<ConfigType extends object> {
    public abstract load(map: ConfigMap): Readonly<ConfigType>;

    protected parseString(map: ConfigMap, key: string, fallback?: string): string {
        const value = this._getSafe(map, key);
        if (value instanceof Error) {
            if (typeof fallback !== 'undefined') {
                return fallback;
            }
            throw value;
        }
        return value;
    }

    protected parseNumber(map: ConfigMap, key: string, fallback?: number): number {
        const value = this._getSafe(map, key);
        if (value instanceof Error) {
            if (typeof fallback !== 'undefined') {
                return fallback;
            }
            throw value;
        }

        /* NaN */
        const parsed = Number(value);
        if (Number.isNaN(parsed)) {
            if (typeof fallback !== 'undefined') {
                return fallback;
            }
            throw new TypeError(`Value NaN does not fit numerical constraint for key '${key}' in config map.`);
        }

        return parsed;
    }

    protected parseInteger(map: ConfigMap, key: string, fallback?: number): number {
        const number = this.parseNumber(map, key, fallback);

        /* Floats */
        if (!Number.isInteger(number)) {
            if (typeof fallback !== 'undefined') {
                return fallback;
            }
            throw new TypeError(`Value float does not fit integer constraint for key ${key} in config map.`);
        }

        return number;
    }

    protected parseBoolean(map: ConfigMap, key: string, fallback?: boolean): boolean {
        const value = this._getSafe(map, key);
        if (value instanceof Error) {
            if (typeof fallback !== 'undefined') {
                return fallback;
            }
            throw value;
        }

        if (value.toUpperCase() === 'TRUE' || value === '1') {
            return true;
        }

        return false;
    }

    private _getSafe(map: ConfigMap, key: string): Error | string {
        if (!(key in map)) {
            return new Error(`Key '${key}' does not exist in config map.`);
        }
        const value = map[key];
        if (!value.length) {
            return new Error(`Key '${key}' has an empty value in config map.`);
        }
        return value;
    }
}
