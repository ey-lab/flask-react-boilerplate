import React from 'react';
import { 
  connect 
} from 'react-redux';
import { 
  push 
} from 'react-router-redux';

import { 
  Card, 
  CardTitle,
  CardText, 
  CardActions 
} from 'material-ui/Card';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const NotFound = (props) => {
  const {dispatch} = props;
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
            onClick={() => dispatch(push('/'))}
          />
        </CardActions>
      </Card>
    </Paper>
  )
};

export default connect(
  state => {},
  dispatch => ({
    dispatch,
  })
)(NotFound);