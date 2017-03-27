import {
  applyMiddleware, 
  compose,
  createStore as _createStore,
} from 'redux';

/**
 * Create store functions that take into account the NODE_ENV environment variable
 * @param {function} reducer app reducer
 * @param {Array} middlewares array containing all middlewares to apply 
 */
function createStore(reducer, middlewares) {
  if (process.env.NODE_ENV === 'development') {
    return _createStore(
      reducer,
      undefined,
      compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension ? window.devToolsExtension() : f => f, // include devToolsExtension
      )
    );
  } else if (process.env.NODE_ENV === 'production') {
    return _createStore(
      reducer,
      undefined,
      applyMiddleware(...middlewares)
    );
  }
}

export default createStore;