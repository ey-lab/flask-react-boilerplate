import React, { 
  PropTypes 
} from 'react';
import { 
  connect,
} from 'react-redux';

import Waiting from '../Waiting/Waiting';

const AuthRequired = (props) => {
  const {
    children, 
    auth: {
      user
    }
  } = props;

  if (user) {
    return children ;
  } else {
    return <Waiting />;
  }
} 

AuthRequired.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(
  mapStateToProps
)(AuthRequired);