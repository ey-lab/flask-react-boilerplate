import React, { 
  PropTypes 
} from 'react';
import { 
  connect,
} from 'react-redux';

import Waiting from '../Waiting/Waiting';

class AuthRequired extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    auth: PropTypes.object.isRequired,
  } 

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     (this.props.auth.user && !(nextProps.auth.user)) || (nextProps.auth.user && !(this.props.auth.user))
  //   );
  // };

  render() {
    const {children, auth: {user}} = this.props;
    if (user) {
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
)(AuthRequired);