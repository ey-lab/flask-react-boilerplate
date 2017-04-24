import React, {
  PropTypes,
} from 'react';
import { 
  connect, 
} from 'react-redux';
import { 
  push, 
} from 'react-router-redux';

import { 
  Card, 
  CardTitle,
  CardText, 
  CardActions, 
} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import {
  HOME_ROUTE,
} from '../../../common';

const NotFound = (props) => {
  const {
    onClick,
  } = props;

  return (
    <Paper zDepth={3}>
      <Card>
        <CardTitle 
          title="Oups..." 
          subtitle="Error 404 : Not Found"/>
        <CardText>
          The page <strong>{window.location.href}</strong> could not be found. 
        </CardText>
        <CardActions>
          <RaisedButton
            label="Take me home"
            primary
            onClick={onClick}
          />
        </CardActions>
      </Card>
    </Paper>
  )
};

NotFound.propTypes = {
  onClick:PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onClick: () => push(HOME_ROUTE),
};

export default connect(
  null,
  mapDispatchToProps
)(NotFound);