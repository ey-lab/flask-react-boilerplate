import React, { PropTypes } from 'react';
import { 
  propTypes, 
  reduxForm, 
  Field,
  SubmissionError, 
} from 'redux-form';
import { 
  push 
} from 'react-router-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';

import { 
  Card, 
  CardActions,
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import defaultTheme from '../defaultTheme';

import TextInput from '../../components/TextInput';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edecec',
    
  },

  card: {
    minWidth: 300,
  },

  avatar: {
    margin: '1em',
    textAlign: 'center',
  },

  form: {
    padding: '0 1em 1em 1em'
  },

  input: {
    display: 'flex',
  },
};

const prefixedStyles = {};

const Login = (props) => {
  const { handleSubmit, onSubmit, submitting, theme } = props;

  const muiTheme = getMuiTheme(theme); 
  if (!prefixedStyles.main) {
    const prefix = autoprefixer(muiTheme);
    prefixedStyles.main = prefix(styles.main);
    prefixedStyles.form = prefix(styles.form);
    prefixedStyles.card = prefix(styles.card);
    prefixedStyles.input = prefix(styles.input);
    prefixedStyles.avatar = prefix(styles.avatar);
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
        <div style={prefixedStyles.main}>
            <Card style={prefixedStyles.card}>
                <div style={prefixedStyles.avatar}>
                  <Avatar icon={<LockIcon />} size={60} />
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div style={prefixedStyles.form}>
                    <div style={prefixedStyles.input}>
                      <Field
                        name="emailAddress"
                        component={TextInput}
                        type="text"
                        floatingLabelText="Email Address"
                        disabled={submitting}
                      />
                    </div>
                    <div style={prefixedStyles.input}>
                      <Field
                        name="password"
                        component={TextInput}
                        type="password"
                        floatingLabelText="Password"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                  <CardActions>
                    <RaisedButton
                      type="submit"
                      primary
                      label="Log In"
                      disabled={submitting}
                      icon={submitting && <CircularProgress size={20} thickness={2}/>}
                      fullWidth
                    />
                  </CardActions>
                </form>
            </Card>
        </div>
    </MuiThemeProvider>
  );
}

Login.propTypes = {
  ...propTypes,
  theme: PropTypes.object.isRequired,

}

Login.defaultProps = {
  theme: defaultTheme,
}

const users = [
  {
    emailAddress: 'nicolas.maurice@fr.ey.com',
    password: "EYlab17",
    userName: "nmaurice"
  },
  {
    emailAddress: 'julien.marchand@fr.ey.com',
    password: "EYlab17",
    userName: "jmarchand"
  },
]

const fakeLogin = (values, dispatch) => {
  return new Promise(resolve => setTimeout(resolve, 1000)).then(
    (response) => {
      if (!users.map(user => user.emailAddress).includes(values.emailAddress)) {
        throw new SubmissionError({emailAddress: "Specified user does not exist", _error: "Login failed..."});
      } else if (users.find(user => user.emailAddress === values.emailAddress).password !== values.password) {
        throw new SubmissionError({password: "Password is not correct", _error: "Login failed..."});
      } else {
        dispatch(push('/'));
      }
    }
  );
};


export default reduxForm({
    form: "login",
    onSubmit: (values, dispatch, props) => fakeLogin(values, dispatch) 
  })(Login);

