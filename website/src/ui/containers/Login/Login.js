import React, { 
  PropTypes 
} from 'react';
import {
  connect,
} from 'react-redux';
import { 
  propTypes, 
  reduxForm, 
  Field,
} from 'redux-form';
import {
  login,
} from '../../../redux/actions';
import compose from 'recompose/compose';

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
  body: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',  
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
    prefixedStyles.body = prefix(styles.body);
    prefixedStyles.card = prefix(styles.card);
    prefixedStyles.avatar = prefix(styles.avatar);
    prefixedStyles.form = prefix(styles.form);
    prefixedStyles.input = prefix(styles.input);
  }

  return (
    <div style={prefixedStyles.body}>
      <Card style={prefixedStyles.card}>
        <div style={prefixedStyles.avatar}>
          <Avatar icon={<LockIcon />} size={60} />
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={prefixedStyles.form}>
            <div style={prefixedStyles.input}>
              <Field
                name="email"
                component={TextInput}
                type="text"
                floatingLabelText="Email"
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
  );
}

Login.propTypes = {
  ...propTypes,
  theme: PropTypes.object.isRequired,
  csrfToken: PropTypes.string,
}

Login.defaultProps = {
  theme: defaultTheme,
}

const mapStateToProps = (state) => ({
  csrfToken: state.auth.csrfToken, 
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: "login",
    onSubmit: (values, dispatch, props) => {
      dispatch(login(values, props.form, props.csrfToken))
    },
  })
)
export default enhance(Login);

