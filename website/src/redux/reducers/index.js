import {
  combineReducers,
} from 'redux';
import { 
  reducer as form, 
} from 'redux-form';
import {
  routerReducer as routing,
} from 'react-router-redux';

import ui from './ui';
import auth from './auth';

/* Build app reducers */
const reducer = combineReducers({
  auth,
  ui,
  routing,
  form,
});

export default reducer;