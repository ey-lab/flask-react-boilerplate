import React, { PropTypes } from 'react';
import { 
  connect 
} from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';
import { 
  toggleSidebar as toggleSidebarAction 
} from '../../actions';

const AppBar = ({ title, toggleSidebar }) => (
  <MuiAppBar
    title={title}
    onLeftIconButtonTouchTap={toggleSidebar}
    zDepth={2}
  />
);

AppBar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null,
  {
    toggleSidebar: toggleSidebarAction,
  }
)(AppBar);