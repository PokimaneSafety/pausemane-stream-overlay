import { Random } from '../../helpers';
import { HttpConstants } from '../constants';
import { HttpServer } from './server';

function MakePort() {
    return Random.RandomInt53(HttpConstants.MINIMUM_EPHEMERAL_PORT, HttpConstants.MAXIMUM_EPHEMERAL_PORT);
}

describe('HTTP', () => {
    describe('Server', () => {
        it('Should construct', () => {
            const serverFactory = () => {
                new HttpServer();
            };
            expect(serverFactory).not.toThrow();
        });

        it('Should not be listening', () => {
            const server = new HttpServer();
            expect(server.listening).toBeFalsy();
        });

        it('Should not throw an error when listening', async () => {
            expect.assertions(2);

            const server = new HttpServer();

            expect(server.listening).toBeFalsy();
            await expect(server.listen('127.0.0.1', MakePort())).resolves.toBeUndefined();
            await server.close();
        });

        it('Should set listening to true after successfully listening', async () => {
            expect.assertions(2);

            const server = new HttpServer();

            expect(server.listening).toBeFalsy();
            await server.listen('127.0.0.1', MakePort());
            expect(server.listening).toBeTruthy();
            await server.close();
        });

        it('Should set listening to false after closing', async () => {
            expect.assertions(2);

            const server = new HttpServer();

            await server.listen('127.0.0.1', MakePort());
            expect(server.listening).toBeTruthy();
            await server.close();
            expect(server.listening).toBeFalsy();
        });

        it('Should throw an error when trying to listen to a port thats in use', async () => {
            expect.assertions(3);

            const port = MakePort();
            const server1 = new HttpServer();
            const server2 = new HttpServer();

            await server1.listen('127.0.0.1', port);
            expect(server1.listening).toBeTruthy();

            await expect(server2.listen('127.0.0.1', port)).rejects.toBeInstanceOf(Error);
            expect(server2.listening).toBeFalsy();

            await server1.close();
        });

        it('Should throw an error when trying to close an instance that has already closed', async () => {
            expect.assertions(1);

            const server = new HttpServer();

            await server.listen('127.0.0.1', MakePort());
            await server.close();
            await expect(server.close).rejects.toBeInstanceOf(Error);
        });
    });
});
