import apiClient from './apiClient'; // eslint-disable-next-line 
import fakeHttpClient from './fakeHttpClient';
import HttpClient from './HttpClient';

export * from './resources';
export * from './apiClient';

export default apiClient('http://localhost:5000', HttpClient);