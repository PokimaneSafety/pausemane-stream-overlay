import { MockHttpServer } from '../../server.mock';
import { ListenError } from './listen-error';

describe('HTTP', () => {
    describe('Errors', () => {
        describe(ListenError.name, () => {
            it('Should extend the Error class', () => {
                const instance = new ListenError(new MockHttpServer(), '::', 9090);
                expect(instance).toBeInstanceOf(Error);
            });

            it('Should store the server instance', () => {
                const server = new MockHttpServer();
                const instance = new ListenError(server, '::', 9090);
                expect(instance.server).toStrictEqual(server);
            });

            it('Should store the host', () => {
                const host = '::';
                const instance = new ListenError(new MockHttpServer(), host, 9090);
                expect(instance.host).toStrictEqual(host);
            });

            it('Should store the port', () => {
                const port = 9090;
                const instance = new ListenError(new MockHttpServer(), '::', port);
                expect(instance.port).toStrictEqual(port);
            });

            it('Should store the message if one is provided', () => {
                const message = 'Some detail about why this error occurred.';
                const instance = new ListenError(new MockHttpServer(), '::', 9090, message);
                expect(instance.message).toStrictEqual(message);
            });
        });
    });
});
