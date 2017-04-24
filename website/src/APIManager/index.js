import APIManager from './APIManager';
import HttpProvider from './HttpProvider';

export * from './APIManager';

export default APIManager(HttpProvider);