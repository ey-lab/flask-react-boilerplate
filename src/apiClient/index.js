import apiClient from './apiClient';
import fakeHttpClient from './fakeHttpClient';
import HttpClient from './HttpClient';

export * from './urls';
export * from './apiClient';

export default apiClient('', new fakeHttpClient());