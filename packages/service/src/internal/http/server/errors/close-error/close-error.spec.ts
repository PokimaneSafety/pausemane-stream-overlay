import { MockHttpServer } from '../../server.mock';
import { CloseError } from './close-error';

describe('HTTP', () => {
    describe('Errors', () => {
        describe(CloseError.name, () => {
            it('Should extend the Error class', () => {
                const instance = new CloseError(new MockHttpServer());
                expect(instance).toBeInstanceOf(Error);
            });

            it('Should store the server instance', () => {
                const server = new MockHttpServer();
                const instance = new CloseError(server);
                expect(instance.server).toStrictEqual(server);
            });

            it('Should store the message if one is provided', () => {
                const message = 'Some detail about why this error occurred.';
                const instance = new CloseError(new MockHttpServer(), message);
                expect(instance.message).toStrictEqual(message);
            });
        });
    });
});
