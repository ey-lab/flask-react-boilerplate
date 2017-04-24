import React, { 
  PropTypes 
} from 'react';
import { 
  connect,
} from 'react-redux';

import Waiting from '../Waiting/Waiting';

const UnauthRequired = (props) => {
  const {
    children, 
    auth: {
      user,
      status: {
        load,
      }
    }
  } = props;

  if (!user && !load.loading) {
    return children ;
  } else {
    return <Waiting />;
  }
} 

UnauthRequired.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(
  mapStateToProps
)(UnauthRequired);