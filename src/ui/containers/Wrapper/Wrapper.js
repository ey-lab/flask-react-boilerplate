import React, { 
  PropTypes 
} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';

import defaultTheme from '../defaultTheme';

injectTapEventPlugin();

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#edecec',
  },
};

const prefixedStyles = {};

const Wrapper = (props) => {
  const {
    children,
    theme,
  } = props
  
  const muiTheme = getMuiTheme(theme);

  if (!prefixedStyles.wrapper) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.wrapper = prefix(styles.wrapper);
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={prefixedStyles.wrapper}>
        { children }
      </div>
    </MuiThemeProvider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
}

Wrapper.defaultProps = {
  theme: defaultTheme,
}

export default Wrapper;