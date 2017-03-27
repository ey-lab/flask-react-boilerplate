import {
  call,
  takeLatest,
} from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
} from '../../actions'


/**
 * Not implemented yet.
 * This saga handles API call response mainly for redirection and notifications
 * @param {} action 
 */

function* handleLoginSuccess(action) {
  yield call(console.log, "Login Success", action);
}

function* responseSaga() {
  yield takeLatest(LOGIN_SUCCESS, handleLoginSuccess);
}

export default responseSaga;