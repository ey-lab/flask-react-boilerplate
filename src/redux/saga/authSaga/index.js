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

import loadAuth from './loadAuth';
import login from './login';
import logout from './logout';
import fetch from './fetch';

import {
  LOAD_AUTH,
  LOGIN,
  LOGOUT,
  FETCH_ERROR,
} from '../../actions';

function createAuthSaga(apiClient) {

  const handleLoadAuth = loadAuth(apiClient);
  const handleLogin = login(apiClient);
  const handleLogout = logout(apiClient);
  const handleFetch = fetch(apiClient);

  function* authSaga() {
    while (true) {
      /* Make an API call to load user authentification (note the call is non blocking) */
      yield fork(handleLoadAuth);

      /* Waits for outcome from the authentification loading task */
      const authTaskOutcomeAction = yield take([`${LOAD_AUTH}_FAILURE`, `${LOAD_AUTH}_SUCCESS`]);

      /* If Authentification loading failed then waits for a correctly completed log in */
      if (authTaskOutcomeAction.type === `${LOAD_AUTH}_FAILURE`) {       
        yield put(push(`/auth/login`));
        let isLoggedIn;
        while (!isLoggedIn) {
          const action = yield take(LOGIN);
          yield fork(handleLogin, action);
          const loginTaskOutcomeAction = yield take([`${LOGIN}_FAILURE`, `${LOGIN}_SUCCESS`]);
          isLoggedIn = (loginTaskOutcomeAction.type === `${LOGIN}_SUCCESS`);
        }
      }
      yield put(push('/'));
      
      /**
       * Reaching this point means user is correctly logged in.
       * From now on user can
       *  - loading authentification
       *  - fetch requests
       *  - logout
       * In case we detect 
       *  - a successful logout
       *  - any load/fetch authentification error with status 401 (not authenficated error)
       * the race overs
       */
      
      function* loadAuthCycle() { 
        yield takeLatest(LOAD_AUTH, handleLoadAuth);
      };

      function* fetchCycle() {
        yield takeEvery(action => action.meta && action.meta.fetch, handleFetch);        
      };

      function* logoutCycle() {
        yield takeLatest(LOGOUT, handleLogout);        
      };

      yield race({
        logoutSuccess: take(`${LOGOUT}_SUCCESS`),    
        loadAuthFailure: take(action => (action.type === `${LOAD_AUTH}_FAILURE` && action.payload.status === 401)),     
        fetchAuthFailure: take(action => (action.type === FETCH_ERROR && action.payload.status === 401)),
        loadAuth: call(loadAuthCycle),
        logout: call(logoutCycle),
        fetch: call(fetchCycle),
      });

      yield put({type: 'RACE_OVER'});
      /* Come back to the beginning of the loop */
    }
  };

  return authSaga;
}; 

export default createAuthSaga;