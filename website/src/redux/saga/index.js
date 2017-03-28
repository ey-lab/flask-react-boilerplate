import createAuthSaga from './authSaga';
import responseSaga from './responseSaga';
/**
 * Build the application saga
 * @param {function} apiClient 
 */
function createSaga(apiClient) {
  function* saga() {
    yield [
      createAuthSaga(apiClient)(),
      responseSaga(),
    ];
  };
  return saga; 
}

export default createSaga;