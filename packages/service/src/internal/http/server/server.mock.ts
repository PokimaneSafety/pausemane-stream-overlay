import { HttpServer } from './server';

jest.mock('./server');
const MockHttpServer = HttpServer;
export { MockHttpServer };
