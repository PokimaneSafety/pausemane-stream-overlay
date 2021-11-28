export interface IServiceHealthConfig {
    readonly host: string;
    readonly port: number;
    readonly path: string;
    readonly trustProxy: boolean;
    readonly uptime: boolean;
}
