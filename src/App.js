import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import HomeIcon from 'material-ui/svg-icons/action/home';

import Layout from './containers/Layout/Layout';
import Menu from './containers/Layout/Menu';
import Home from './containers/Home/Home';

import reducer from './reducers';

const store = createStore(
  reducer, 
  undefined,
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const screens = [
  {
    name: "Home",
    icon: HomeIcon,
  },
];

const MenuComponent = () => {
  return (
    <Menu screens={screens} />
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Layout 
        title='EY App'
        menu={<MenuComponent />}
      >
        <Home />
      </Layout>
    </Provider>
  );
};

export default App;
