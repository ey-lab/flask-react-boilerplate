import React, { 
  PropTypes 
} from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';

import defaultTheme from '../defaultTheme';

const styles = {
  body: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const prefixedStyles = {};

const Waiting = (props) => {
  const { 
    theme 
  } = props;
  const muiTheme = getMuiTheme(theme);
  
  if (!prefixedStyles.main) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.body = prefix(styles.body);
  }

  return (
    <div style={prefixedStyles.body}>
      <CircularProgress size={50} thickness={5} />
    </div>
  );
}

Waiting.propTypes = {
  theme: PropTypes.object.isRequired,
}

Waiting.defaultProps = {
  theme: defaultTheme,
}

export default Waiting;