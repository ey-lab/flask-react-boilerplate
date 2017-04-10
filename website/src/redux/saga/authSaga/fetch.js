import { 
  put, 
  call, 
  cancelled, 
} from 'redux-saga/effects';
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_CANCEL,
} from '../../actions';


const fetch = (apiClient) => {
  /* Implements the side effect to be followed when a fetch request action is dispatched */
  function* handleFetch(action) {
    const { type, payload, meta: {fetch: url, ...meta }} = action;
    
    /* Dispatch action to the store to signal that a FETCH API call has started */
    yield [
      put({ type: FETCH_START }), // general signal coming with every fetch request
      put({ type: `${type}_REQUEST`, payload, meta }), // relative signal
    ];

    try {
      /* Run the API call (this call is blocking => waits until a response/error has been received) */      
      const response = yield call(apiClient, url, payload, meta.resource);
      
     /* On API call success, dispatch a succes action with success information */            
     yield [
        put({ type: FETCH_SUCCESS}),
        put({
          type: `${type}_SUCCESS`,
          payload: response,
          meta: {
            ...meta, 
            fetchUrl: url, 
            requestPayload: payload, 
            fetchStatus: FETCH_SUCCESS,
            csrfToken: response.csrfToken,
          },
        }),
      ];
    } catch(error) {
      /* On API call error, dispatch a failure action with failure information */                  
      yield [
        put({type: FETCH_ERROR, error}),
        put({
          type: `${type}_FAILURE`,
          payload: error,
          error: true,
          meta: {
            ...meta, 
            fetchUrl: url, 
            requestPayload: payload, 
            fetchStatus: FETCH_ERROR,
            csrfToken: error.csrfToken, 
          },
        }),
      ];
    } finally {
      /* In case the saga is cancelled before terminating  */                        
      if (yield cancelled()) {
        yield [
          put(FETCH_CANCEL),
          put({
            type: `${type}_CANCEL`,
            meta: {
              ...meta, 
              fetchUrl: url, 
              requestPayload: payload, 
              fetchStatus: FETCH_CANCEL, 
            },
          }),
        ];
      }
    }
  };

  return handleFetch;
};

export default fetch;