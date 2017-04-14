import { 
  put, 
  call, 
  cancelled,
} from 'redux-saga/effects';

import {
  LOGOUT,
} from '../../actions';
import {
  LOGOUT_RESOURCE,
  LOGOUT as LOGOUT_TYPE,
} from '../../../apiClient';

/**
 * Logout saga creator
 * @param {function} apiClient that builds and handles API calls
 */
const Logout = (apiClient) => {
  /**
   * Saga to be run when a LOGOUT action is dispatched
   */
  function* handleLogout({meta: { csrfToken }}) {
    yield put({
      type: `${LOGOUT}_REQUEST`, 
      meta: {
        date: Date.now(),
      },
    });

    let completed;
    /* Dispatch action to the store to signal that a LOGOUT API call has started */
    try {
      /* Run the API call (note that this call is blocking => waits until a response/error has been received) */      
      yield call(apiClient, LOGOUT_TYPE, LOGOUT_RESOURCE, {csrfToken});

      /* On API call success, dispatch a succes action with success information */            
      yield [
        put({
          type: `${LOGOUT}_SUCCESS`, 
          meta: {
            date: Date.now(),
          },
        })
      ];       
      completed = true;
    } catch(error) {
      /* On API call error, dispatch a failure action with failure information */                  
      yield [
        put({
          type:`${LOGOUT}_FAILURE`,
          payload: error,
          error: true,
          meta: {
            date: Date.now(),
          }
        }),
      ];
      completed = true;
    } finally {
      /* In case the saga is cancelled before terminating  */                        
      if (!completed) {
        if (yield cancelled()) {
          yield put({
            type: `${LOGOUT}_CANCEL`, 
            meta: {
              date: Date.now(),
            },
          });
        }
      }
    }
  };
  
  return handleLogout;
};

export default Logout;