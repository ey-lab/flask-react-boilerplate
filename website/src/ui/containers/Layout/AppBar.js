import React, { 
  PropTypes,
} from 'react';
import { 
  connect ,
} from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';

import { 
  toggleSidebar as toggleSidebarAction, 
} from '../../../redux/actions';
import UserBoxIcon from './UserBox';


const AppBar = (props, context) => {
  const { title, toggleSidebar } = props

  return (
    <MuiAppBar
      title={title}
      onLeftIconButtonTouchTap={toggleSidebar}
      iconElementRight={<UserBoxIcon />}
      zDepth={2}
    />
  );
}

AppBar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}

export default connect(null,
  {
    toggleSidebar: toggleSidebarAction,
  }
)(AppBar);