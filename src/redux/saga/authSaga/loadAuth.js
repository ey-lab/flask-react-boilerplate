import { 
  put, 
  call, 
  cancelled,
} from 'redux-saga/effects';

import {
  LOAD_AUTH,
} from '../../actions';
import {
  GET,
  LOAD_AUTH_URL,
} from '../../../apiClient';

/**
 * Load authentification saga creator
 * @param {function} apiClient that builds and handles API calls
 */
const loadAuth = (apiClient) => {
  /**
   * Saga to be run when a LOAD_AUTH action is dispatched
   */
  function* handleLoadAuth() {
    /* Dispatch action to the store to signal that a LOAD_AUTH API call has started */
    yield put({type: `${LOAD_AUTH}_REQUEST`, meta: {date: Date.now()}});

    let completed;
    try {
      /* Run the API call (this call is blocking => waits until a response/error has been received) */      
      const user = yield call(apiClient, GET, LOAD_AUTH_URL)
      
      /* On API call success, dispatch a succes action with success information */            
      yield [
        put({
          type: `${LOAD_AUTH}_SUCCESS`, 
          payload: user,
          meta: {
            date: Date.now()
          },
        }),
      ];    
      completed = true;         
    } catch(error) {
      /* On API call error, dispatch a failure action with failure information */                  
      yield [
        put({
          type:`${LOAD_AUTH}_FAILURE`,
          payload: error,
          error: true,
          meta: {
            date: Date.now()
          }
        }),
      ];
      completed = true;      
    } finally {
      /* In case the saga is cancelled before terminating  */                        
      if (!completed) {
        if (yield cancelled()) {
          yield put({
            type: `${LOAD_AUTH}_CANCEL`, 
            meta: {
              date: Date.now()
            },
          });
        }
      }
    }
  };
  
  return handleLoadAuth;
};

export default loadAuth;
