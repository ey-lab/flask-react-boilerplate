import { 
  combineReducers 
} from 'redux';
import {
  LOAD_AUTH,
  LOGIN,
  LOGOUT,
  FETCH_ERROR,
} from '../actions';
/**
 * Reducers related to authentification handling
 */

/* reducer responsible for auth.user management */
const userReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOGIN}_SUCCESS`:
      return action.payload;

    case `${LOAD_AUTH}_SUCCESS`:
      return action.payload;
    
    case `${LOAD_AUTH}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }

    case `${LOGOUT}_SUCCESS`:
      return null;
    
    case `${FETCH_ERROR}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }

    default:
      return state;
  }
};

/* reducer responsible for login status management */
const loginStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOGIN}_REQUEST`:
      return {
        loggingIn: true,
        requestDate: action.meta.date,
      };

    case `${LOGIN}_SUCCESS`:
      return {
        ...state,
        loggingIn: false,
        successDate: action.meta.date,
      };

    case `${LOGIN}_FAILURE`:
      return {
        ...state,
        loggingIn: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${LOGIN}_CANCEL`:
      return {
        ...state,
        loggingIn: false,
        cancelDate: action.meta.date,
      };

    case `${LOGOUT}_SUCCESS`:
      return null; 

    case `${LOAD_AUTH}_FAILURE`:
      if (action.payload.status === 401) {
        return null;
      } else {
        return state;
      }

    default:
      return state;
  }
};

/* reducer responsible for load authentification status management */
const loadAuthStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOAD_AUTH}_REQUEST`:
      return {
        loading: true,
        requestDate: action.meta.date,
      };

    case `${LOAD_AUTH}_SUCCESS`:
      return {
        ...state,
        loading: false,
        successDate: action.meta.date,
      };

    case `${LOAD_AUTH}_FAILURE`:
      return {
        ...state,
        loading: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${LOAD_AUTH}_CANCEL`:
      return {
        ...state,
        loading: false,
        cancelDate: action.meta.date,
      };

    case `${LOGOUT}_SUCCESS`:
      return null; 
      
    default:
      return state;
  }
};

/* reducer responsible for logout status management */
const logoutStatusReducer = (state = null, action) => {
  switch (action.type) {
    case `${LOGOUT}_REQUEST`:
      return {
        loggingOut: true,
        requestDate: action.meta.date,
      };

    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        loggingOut: false,
        successDate: action.meta.date,
      };

    case `${LOGOUT}_FAILURE`:
      return {
        ...state,
        loggingOut: false,
        failureDate: action.meta.date,
        error: action.payload,
      };

    case `${LOGOUT}_CANCEL`:
      return {
        ...state,
        loggingOut: false,
        cancelDate: action.meta.date,
      };

    case `${LOGIN}_SUCCESS`:
      return null; 
    
    case `${LOAD_AUTH}_SUCCESS`:
      return null; 
      
    default:
      return state;
  }
};

/* Combine all reducers into the auth reducers */
export default combineReducers({
  user: userReducer,
  status: combineReducers({
    load: loadAuthStatusReducer,
    login: loginStatusReducer,
    logout: logoutStatusReducer,
  }),
});
