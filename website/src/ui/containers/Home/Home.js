import React from 'react'
import { 
  connect
} from 'react-redux';
import { 
  Card, 
  CardTitle, 
  CardHeader, 
  CardText
} from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'

import {
  white
} from 'material-ui/styles/colors';

import logo from './logo.svg';

const Home = (props) => {
  const {
    user
  } = props;

  return (
    <Paper zDepth={3}>
      <Card>
        <CardHeader
          avatar={<Avatar src={logo} backgroundColor={white} size={40}/>}
          title="Home"
          subtitle="React App"
        />
        <CardTitle 
          title={`Hey ${user.firstName}`}
          subtitle="We are glad to welcome you on our Flask-React boilerplate ! :-)"/>
        <CardText>
          {"Love React + Python <3"}
        </CardText>
      </Card>
    </Paper>
  )
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
})

export default connect(
  mapStateToProps
)(Home);