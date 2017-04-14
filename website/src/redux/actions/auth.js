/**
 * Authentification actions
 */

/* For loading user authentification from server  */
export const LOAD_AUTH = 'LOAD_AUTH';
export const LOAD_AUTH_REQUEST = 'LOAD_AUTH_REQUEST';
export const LOAD_AUTH_SUCCESS = 'LOAD_AUTH_SUCCESS';
export const LOAD_AUTH_FAILURE = 'LOAD_AUTH_FAILURE';

/* Load authentification action creator  */
export const loadAuth = () => ({
  type: LOAD_AUTH,
})

/* For login user on server  */
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

/* Login action creator  */
export const login = (values, formName, csrfToken) => ({
  type: LOGIN,
  payload: values,
  meta: {
    formName,
    csrfToken,
  },
})

/* For logout user on server  */
export const LOGOUT= 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

/* Logout action creator  */
export const logout = (csrfToken) => ({
  type: LOGOUT,
  meta: {
    csrfToken,
  },
})
