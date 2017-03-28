import React from 'react';
import { 
  Provider,
} from 'react-redux';
import { 
  Router,
  browserHistory,
} from 'react-router';
import { 
  syncHistoryWithStore,
} from 'react-router-redux';

import apiClient from './apiClient';
import createStore from './redux'
import getRoutes from './Routes';

const store = createStore(apiClient, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        { getRoutes() }
      </Router>
    </Provider>
  );
};

export default App;
