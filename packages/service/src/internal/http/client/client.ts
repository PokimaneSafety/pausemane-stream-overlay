import type { Got } from 'got';
import got from 'got';
import type * as Stream from 'stream';
import { URLSearchParams } from 'url';

export interface IHttpClientOptions {
    prefixUrl?: string;
}

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'HEAD', 'DELETE'] as const;
export type HttpMethod = typeof HTTP_METHODS[number];
export type HttpBody = string | object | Buffer | Stream.Readable;
export type HttpQuery = Record<string, string>;

export interface IHttpRequest<Method extends HttpMethod = HttpMethod, Query extends HttpQuery = HttpQuery> {
    path?: string;
    method?: Method;
    query?: Query;
    body?: HttpBody;
}

export interface IHttpResponse<Body extends HttpBody = HttpBody> {
    readonly code: number;
    readonly body: Body;
}

export interface IHttpClient {
    extend(options?: IHttpClientOptions): IHttpClient;
    get<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'GET', Query>, 'method'>
    ): Promise<IHttpResponse<Body>>;
    post<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'POST', Query>, 'method'>
    ): Promise<IHttpResponse<Body>>;
    put<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'PUT', Query>, 'method'>
    ): Promise<IHttpResponse<Body>>;
    patch<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'PATCH', Query>, 'method'>
    ): Promise<IHttpResponse<Body>>;
    head<Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'HEAD', Query>, 'method'>
    ): Promise<IHttpResponse<never>>;
    delete<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'DELETE', Query>, 'method'>
    ): Promise<IHttpResponse<Body>>;
    request<
        Body extends HttpBody = HttpBody,
        Method extends HttpMethod = HttpMethod,
        Query extends HttpQuery = HttpQuery
    >(
        options: IHttpRequest<Method, Query>
    ): Promise<IHttpResponse<Body>>;
}

export class HttpClient implements IHttpClient {
    private readonly _options?: IHttpClientOptions;
    private readonly _instance: Got;

    public constructor(options?: IHttpClientOptions) {
        this._options = options;
        this._instance = got.extend({ prefixUrl: options?.prefixUrl });
    }

    public extend(options?: IHttpClientOptions): IHttpClient {
        return new HttpClient({ ...this._options, ...options });
    }

    public get<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'GET', Query>, 'method'>
    ): Promise<IHttpResponse<Body>> {
        return this.request<Body>({ ...options, method: 'GET' });
    }

    public post<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'POST', Query>, 'method'>
    ): Promise<IHttpResponse<Body>> {
        return this.request<Body>({ ...options, method: 'POST' });
    }

    public put<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'PUT', Query>, 'method'>
    ): Promise<IHttpResponse<Body>> {
        return this.request<Body>({ ...options, method: 'PUT' });
    }

    public patch<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'PATCH', Query>, 'method'>
    ): Promise<IHttpResponse<Body>> {
        return this.request<Body>({ ...options, method: 'PATCH' });
    }

    public head<Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'HEAD', Query>, 'method'>
    ): Promise<IHttpResponse<never>> {
        return this.request<never>({ ...options, method: 'HEAD' });
    }

    public delete<Body extends HttpBody = HttpBody, Query extends HttpQuery = HttpQuery>(
        options: Omit<IHttpRequest<'DELETE', Query>, 'method'>
    ): Promise<IHttpResponse<Body>> {
        return this.request<Body>({ ...options, method: 'DELETE' });
    }

    public async request<
        Body extends HttpBody = HttpBody,
        Method extends HttpMethod = HttpMethod,
        Query extends HttpQuery = HttpQuery
    >(options: IHttpRequest<Method, Query>): Promise<IHttpResponse<Body>> {
        let body;
        if (typeof options.body === 'object') {
            body = JSON.stringify(options.body);
        } else {
            body = options.body;
        }

        const request = this._instance({
            body,
            method: options.method,
            ...(options.query && { searchParams: new URLSearchParams(options.query) }),
        });
        const response = await request;

        return {
            body: response.body as Body,
            code: response.statusCode,
        };
    }
}
