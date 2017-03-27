import React from 'react'

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

const Home = () => {
  return (
    <Paper zDepth={3}>
      <Card>
        <CardHeader
          avatar={<Avatar src={logo} backgroundColor={white} size={40}/>}
          title="Home"
          subtitle="React App"
        />
        <CardTitle 
          title="Welcome to our new amazing app" 
          subtitle="Love React <3"/>
        <CardText>
          We are very happy to introduce you our new framework ! :)
        </CardText>
      </Card>
    </Paper>
  )
};

export default Home;