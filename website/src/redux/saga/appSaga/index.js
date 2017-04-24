import {
  put,
  take,
  call,
  fork,
  takeEvery,
  takeLatest,
  race,
} from 'redux-saga/effects';
import {
  push,
} from 'react-router-redux';

import createFetchSaga from './fetchSaga';

import {
  loadAuth,
  LOAD_AUTH,
  LOGIN,
  LOGOUT,
  FETCH_FAILURE,
  AUTH_ACTION_TYPES,
} from '../../actions';
import {
  HOME_ROUTE,
  AUTH_LOGIN_ROUTE,
} from '../../../common';

/**
 * App Saga creator
 * @param {function} APIManager - function that perform API fetch calls
 */
function createAppSaga(APIManager) {

  const handleFetch = createFetchSaga(APIManager);
  /**
   * App saga ran each time a user connects to the app
   */
  function* appSaga() {
    while (true) {
      /* Make an API call to load user authentification */
      yield fork(handleFetch, loadAuth());

      /* Waits for outcome from the authentification loading task */
      const authTaskOutcomeAction = yield take([`${LOAD_AUTH}_FAILURE`, `${LOAD_AUTH}_SUCCESS`]);

      if (authTaskOutcomeAction.type === `${LOAD_AUTH}_FAILURE`) {    
        /* If Authentification loading failed then user is redirected to the login page */   
        yield put(push(AUTH_LOGIN_ROUTE));

        function* loginCycle() {
          yield takeLatest(LOGIN, handleFetch);
        }

        /**
         * Starts a race that accepts LOGIN requests and finishes when a succesful login action is dispatched to the server
         */
        yield race({
          loginCycle: call(loginCycle),
          loginSuccess: take(`${LOGIN}_SUCCESS`),
        });
      }

      yield put(push(HOME_ROUTE));
      
      /**
       * Reaching this point means user is correctly logged in.
       * From now on user can
       *  - load authentification
       *  - perform fetch request
       *  - logout
       * In case we detect 
       *  - a successful logout
       *  - any fetch authentification error with status 401
       */
      
      function* loadAuthCycle() { 
        yield takeLatest(LOAD_AUTH, handleFetch);
      };

      function* logoutCycle() {
        yield takeLatest(LOGOUT, handleFetch);        
      };
      
      function* fetchCycle() {
        yield takeEvery(action => action.meta && action.meta.fetch && !AUTH_ACTION_TYPES.includes(action.type), handleFetch);        
      };

      yield race({
        logoutSuccess: take(`${LOGOUT}_SUCCESS`),         
        unauthFailure: take(action => (action.type === FETCH_FAILURE && action.payload.status === 401)),
        loadAuthCycle: call(loadAuthCycle),
        logoutCycle: call(logoutCycle),
        fetchCycle: call(fetchCycle),
      });

      /* Come back to the beginning of the loop */
    }
  };

  return appSaga;
}; 

export default createAppSaga;