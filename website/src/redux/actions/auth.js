/**
 * Authentification actions
 */
import {
  GET,
  POST,
  PUT,
} from '../../APIManager';
import {
  AUTH_API_BASE_URL,
  LOAD_AUTH_RESOURCE,
  LOGIN_RESOURCE,
  LOGOUT_RESOURCE,
} from '../../common';

/* For loading user authentification from server  */
export const LOAD_AUTH = 'LOAD_AUTH';
export const LOAD_AUTH_REQUEST = 'LOAD_AUTH_REQUEST';
export const LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS';
export const LOAD_AUTH_FAILURE = 'LOAD_AUTH_FAILURE';
export const LOAD_AUTH_CANCEL = 'LOAD_AUTH_CANCEL';

/**
 * Load authentification action creator
 */
export const loadAuth = () => ({
  type: LOAD_AUTH,
  meta: {
    APIBaseUrl: AUTH_API_BASE_URL,
    resource: LOAD_AUTH_RESOURCE,
    requestType: GET,
  }
})

/* For login user on server  */
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_CANCEL = 'LOGIN_CANCEL';

/**
 * Login action creator 
 * @param {object} values - Login credentials
 * @param {string} [formName] - if the login action is dispatched using redux-form ()
 * @param {string} [csrfToken] - csrf token
 */
export const login = (values, formName, csrfToken) => ({
  type: LOGIN,
  payload: values,
  meta: {
    APIBaseUrl: AUTH_API_BASE_URL,    
    resource: LOGIN_RESOURCE,
    requestType: POST,
    formName,
    csrfToken,
  },
})

/* For logout user on server  */
export const LOGOUT= 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_CANCEL = 'LOGOUT_CANCEL';

/**
 * Logout action creator 
 * @param {string} [csrfToken] csrf token 
 */
export const logout = (csrfToken) => ({
  type: LOGOUT,
  meta: {
    APIBaseUrl: AUTH_API_BASE_URL,    
    resource: LOGOUT_RESOURCE,
    requestType: PUT,
    csrfToken,
  },
})

export const AUTH_ACTION_TYPES = [LOAD_AUTH, LOGIN, LOGOUT]