import createSagaMiddleware from 'redux-saga';
import {
  routerMiddleware, 
} from 'react-router-redux';

import _createStore from './store';
import reducer from './reducers';
import createSaga from './saga';

/**
 * High level createStore function
 * @param {function} apiClient function that builds and handles API calls (will be transmitted to every saga performing API calls)
 * @param {object} history router history (used by react-router)
 */
function createStore(apiClient, history) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const store = _createStore(reducer, middlewares);
  const saga = createSaga(apiClient);
  sagaMiddleware.run(saga);

  return store;
};

export default createStore;