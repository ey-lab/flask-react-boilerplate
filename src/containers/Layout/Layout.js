import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';

import AppBar from './AppBar';
import SideBar from './SideBar';
import defaultTheme from './defaultTheme';

injectTapEventPlugin();

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column', 
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },

  body: {
    backgroundColor: '#edecec',
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    padding: '1em',
  },

};

const prefixedStyles = {};

const Layout = (props) => {
  const {
    children,
    menu,
    theme,
    title,
  } = props
  
  const muiTheme = getMuiTheme(theme);

  if (!prefixedStyles.main) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.wrapper = prefix(styles.wrapper);
    prefixedStyles.main = prefix(styles.main);
    prefixedStyles.body = prefix(styles.body);
    prefixedStyles.content = prefix(styles.content);
  }
  
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={prefixedStyles.wrapper}>
        <div style={prefixedStyles.main}>
          <AppBar title={title} />
          <div className="body" style={prefixedStyles.body}>
            <div style={prefixedStyles.content}>{ children }</div>
            <SideBar>
              { menu }
            </SideBar>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );

};

Layout.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.element,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
}

Layout.defaultProps = {
  theme: defaultTheme,
}

export default Layout;