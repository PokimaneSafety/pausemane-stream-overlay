export type HttpHeader = undefined | null | string | number | boolean | (string | number | boolean)[];

export interface IHttpHeaders {
    [key: string]: HttpHeader;
}
