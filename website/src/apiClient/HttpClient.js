import HttpError from './HttpError';

/**
 * complete an API call
 * @param {String} url to call
 * @param {Object} options useful for the request
 */
const HttpClient = (url, options={}) => {
  const requestHeaders = options.headers || new Headers({Accept: 'application/json'});

  requestHeaders.set('Content-Type', 'application/json');
  console.log('fetch', url, options);
  return (fetch(url, {...options, headers: requestHeaders })
    .then(response => {
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: response.body,
      };
    })
    .then(({status, statusText, headers, body}) => {
      console.log(status);
      if (status < 200 || status >= 300) {
        return Promise.reject(new HttpError(statusText, status));
      }
    })
  );
};

export default HttpClient;