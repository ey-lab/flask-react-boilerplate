import React, { 
  PropTypes,
} from 'react';
import { 
  connect ,
} from 'react-redux';
import MuiAppBar from 'material-ui/AppBar';

import { 
  toggleSidebar, 
} from '../../../redux/actions';
import UserBoxIcon from './UserBox';


const AppBar = (props) => {
  const { 
    title, 
    toggleSidebar
  } = props

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

const mapDispatchToProps = {
  toggleSidebar,
};

export default connect(
  null,
  mapDispatchToProps
)(AppBar);