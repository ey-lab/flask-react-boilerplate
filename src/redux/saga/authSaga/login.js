import { 
  put, 
  call, 
  cancelled,
} from 'redux-saga/effects';
import { 
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed,
} from 'redux-form';
import {
  LOGIN,
} from '../../actions'
import {
  LOGIN_URL,
  POST,
} from '../../../apiClient';

/**
 * Login saga creator
 * @param {function} apiClient that builds and handles API calls
 */
const login = (apiClient) => {
  /**
   * Saga to be run when a LOGIN action is dispatched
   * @param {object} action LOGIN action
   */
  function* handleLogin(action) {
    const { payload, meta: {formName} } = action;
    
    /* Dispatch action to the store to signal that a LOGIN API call has started */
    yield [
      put({
        type: `${LOGIN}_REQUEST`, 
        meta: {
          date: Date.now(),
          payload,  
        },
      }),
      put(startSubmit(formName)), // for form reducer
    ];

    let completed;    
    try {
      /* Run the API call (this call is blocking => waits until a response/error has been received) */      
      const user = yield call(apiClient, POST,  LOGIN_URL, {data: payload})
      
      /* On API call success, dispatch a succes action with success information */            
      yield [
        put(stopSubmit(formName)), // for form reducer 
        put(setSubmitSucceeded(formName)), // for form reducer 
        put({
          type: `${LOGIN}_SUCCESS`, 
          payload: user,
          meta: {
            date: Date.now(),
            payload,
          },
        }),  
      ];  
      completed=true;         
    } catch(error) {
      /* On API call error, dispatch a failure action with failure information */                  
      yield [
        put(stopSubmit(formName, error ? error.errors : undefined)), // for form reducer
        put(setSubmitFailed(formName, error && error.errors ? Object.keys(error.errors) : undefined)), // for form reducer
        put({
          type:`${LOGIN}_FAILURE`,
          payload: error,
          error: true,
          meta: {
            date: Date.now(),
            payload,
          }
        }), 
      ];
      completed=true;    
    } finally {
      /* In case the saga is cancelled before terminating  */                        
      if (!completed) {
        if (yield cancelled()) {
          yield [
            put(stopSubmit(formName)), // for form reducer     
            put({
              type: `${LOGIN}_CANCEL`, 
              meta: {
                date: Date.now()
              },
            }),
          ];
        }
      }
    }
  };
  
  return handleLogin;
};

export default login;