import { HttpClient } from './client';

jest.mock('./client');
const MockHttpClient = HttpClient;
export { MockHttpClient };
