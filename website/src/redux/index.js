import createSagaMiddleware from 'redux-saga';
import {
  routerMiddleware, 
} from 'react-router-redux';

import _createStore from './store';
import reducer from './reducers';
import createSaga from './saga';

/**
 * High level createStore function
 * @param {function} APIManager function that builds and handles API calls (will be transmitted to every saga performing API calls)
 * @param {object} history router history (used by react-router)
 */
function createStore(APIManager, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const store = _createStore(reducer, middlewares);
  const saga = createSaga(APIManager);
  sagaMiddleware.run(saga);

  return store;
};

export default createStore;