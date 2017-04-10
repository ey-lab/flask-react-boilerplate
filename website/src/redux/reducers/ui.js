import { 
  TOGGLE_SIDEBAR, 
  SET_SIDEBAR_VISIBILITY,
  TOGGLE_USER_BOX,
  SET_USER_BOX_VISIBILITY,
  LOGOUT
} from '../actions';

const initialState = {
  sidebarOpen: true,
  userBoxOpen: false,
}
/* ui reducer */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case TOGGLE_USER_BOX:
      return {
        ...state,
        userBoxOpen: !state.userBoxOpen,
      };

    case SET_SIDEBAR_VISIBILITY:
      return {
        ...state,
        sidebarOpen: payload,
      };
    
    case SET_USER_BOX_VISIBILITY:
      return {
        ...state,
        userBoxOpen: payload,
      };
    
    case `${LOGOUT}_SUCCESS`:
      return initialState;

    default:
      return state;
  }
}