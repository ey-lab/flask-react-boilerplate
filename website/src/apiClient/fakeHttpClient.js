import {
  SubmissionError
} from 'redux-form';
import {
  LOAD_AUTH_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from './urls';
import HttpError from './HttpError';

const fakeHttpClient = () => {
  const users = [
    {
      emailAddress: 'nicolas.maurice@fr.ey.com',
      password: "EYlab17",
      userName: "nmaurice"
    },
    {
      userName: "jmarchand",
      emailAddress: 'julien.marchand@fr.ey.com',
      password: "EYlab17",
    },
  ];
  let userConnected = users[0];
  
  const latency = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetch = (url, options = {}) => {
    switch (url) {
      case `/${LOAD_AUTH_URL}`:
        return latency(2000).then(
          response => {
            if (userConnected) {
              return { json: userConnected }
            } else {
              throw new HttpError("Not authentificated", 401)
            }
          }
        );
      
      case `/${LOGIN_URL}`:
        return latency(500).then(
          response => {
            const values = JSON.parse(options.body);
            if (!users.map(user => user.emailAddress).includes(values.emailAddress)) {
              throw new SubmissionError({
                status: 402,
                emailAddress: "Specified user does not exist", 
                _error: "Login failed...",
              });
            } else if (users.find(user => user.emailAddress === values.emailAddress).password !== values.password) {
              throw new SubmissionError({
                password: "Password is not correct",
                _error: "Login failed...",
              });
            } else {
              userConnected = users.find(user => user.emailAddress === values.emailAddress)
              return {json: users.find(user => user.emailAddress === values.emailAddress)};
            }
          }
        );
      
      case `/${LOGOUT_URL}`:
        return latency(2000).then(
          response => {
            userConnected = null;
          }
        );

      default:
        return latency(500).then(
          response => {
            throw new HttpError("Not found", 404)
          }
        )
    }
  };

  return fetch;
}

export default fakeHttpClient;