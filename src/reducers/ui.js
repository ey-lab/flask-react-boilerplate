import { TOGGLE_SIDEBAR, SET_SIDEBAR_VISIBILITY } from '../actions';

const initialState = {
  sidebarOpen: true,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case SET_SIDEBAR_VISIBILITY:
      return {
        ...state,
        sidebarOpen: payload,
      };

    default:
      return state;
  }
}