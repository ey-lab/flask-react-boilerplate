import React from 'react';
import {
  IndexRoute,
  Route,
} from 'react-router';

import HomeIcon from 'material-ui/svg-icons/action/home';

import Wrapper from './ui/containers/Wrapper/Wrapper';
import Login from './ui/containers/Login/Login';
import Layout from './ui/containers/Layout/Layout';
import Menu from './ui/containers/Layout/Menu';
import Home from './ui/containers/Home/Home';
import NotFound from './ui/containers/NotFound/NotFound';

import {
  AuthRequired,
  UnauthRequired,
} from './ui/containers/Auth';

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
];

const MenuComponent = () => (
  <Menu items={menuItems} />
);

const LayoutComponent = ({children}) => {
  return (
    <Layout 
      title='EY App'
      menu={<MenuComponent />}
    >
      { children }
    </Layout>
  );
};

const getRoutes = () => {
  return (
    <Route component={Wrapper}>
      <Route path="/" >
        <Route path="auth" component={UnauthRequired}>
          <Route path="login" component={Login} />
        </Route>
        <Route component={AuthRequired}>
          <Route component={LayoutComponent}>
            <IndexRoute component={Home} />
            <Route path="*" component={NotFound} />
          </Route>
        </Route>
      </Route>
    </Route>
  );
};

export default getRoutes;