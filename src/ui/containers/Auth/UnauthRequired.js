import React, { PropTypes } from 'react';
import { 
  connect,
} from 'react-redux';

import Waiting from '../Waiting/Waiting';

class UnauthRequired extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    auth: PropTypes.object.isRequired,
  } 

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.auth.user && !(nextProps.auth.user)) || (nextProps.auth.user && !(this.props.auth.user))
    );
  };

  render() {
    const {
      children, 
      auth: {
        user,
        status: {
          load,
        }
      }
    } = this.props;
    if (!user && !load.loading) {
      return children ;
    } else {
      return <Waiting />;
    }
  } 
}

export default connect(
  state => ({
    auth: state.auth,
  }),
)(UnauthRequired);