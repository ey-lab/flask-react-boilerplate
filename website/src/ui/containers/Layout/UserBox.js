import React, {
  PropTypes,
} from 'react';
import { 
  connect,
} from 'react-redux';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import InputIcon from 'material-ui/svg-icons/action/input';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CircularProgress from 'material-ui/CircularProgress';
import {
  getStyles as getAppBarStyles,
} from 'material-ui/AppBar/AppBar';
import {
  logout as logoutAction,
  setUserBoxVisibility,
 } from '../../../redux/actions';


const UserBoxIcon = (props, context) => {
  const { 
    onLogout, 
    open,
    auth: {
      status: {
        logout,
      }
    },
    onRequestChange,
  } = props;

  const styles = getAppBarStyles(props, context);

  return (
    <IconMenu 
      iconButtonElement={
        <IconButton>
          <MoreVertIcon {...styles.iconButtonIconStyle} />
        </IconButton>
      }
      anchorOrigin={{vertical:'bottom', horizontal:'right',}}
      targetOrigin={{vertical:'top', horizontal:'right',}}
      open={open}
      onRequestChange={onRequestChange}
    >
      <MenuItem 
        primaryText="Logout" 
        onClick={onLogout} 
        leftIcon={logout && logout.loggingOut ? <CircularProgress size={20} thickness={2} /> : <InputIcon />}
      />
    </IconMenu>
  );
};

UserBoxIcon.propTypes = {
  onLogout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  logout: PropTypes.oneOfType([
    PropTypes.object,
  ]),
  onRequestChange: PropTypes.func.isRequired
};

UserBoxIcon.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    auth: state.auth,
    open: state.ui.userBoxOpen,
  }),
  (dispatch) => ({
    onLogout: () => dispatch(logoutAction()),
    onRequestChange: (value) => dispatch(setUserBoxVisibility(value)),
  })
)(UserBoxIcon);