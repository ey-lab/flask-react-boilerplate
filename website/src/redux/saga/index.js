import createAppSaga from './appSaga';

/**
 * Function that run all the sagas to be run
 * @param {function} APIManager - function that perform API fetch calls
 */
function createSaga(APIManager) {
  function* saga() {
    yield [
      createAppSaga(APIManager)(),
    ];
  };
  return saga; 
}

export default createSaga;