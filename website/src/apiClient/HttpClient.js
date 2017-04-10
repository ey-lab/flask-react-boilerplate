import HttpError from './HttpError';

/**
 * complete an API call
 * @param {String} url to call
 * @param {Object} options useful for the request
 */
const HttpClient = (url, options={}) => {
  /* Set request headers */ 
  const requestHeaders = options.headers || new Headers({Accept: 'application/json'});

  requestHeaders.set('Content-Type', 'application/json');

  if (options.csrfToken) {
    requestHeaders.set('X-CSRFToken', options.csrfToken);
  }


  return (
    fetch(url, {
      ...options, 
      headers: requestHeaders, 
      mode: 'cors', // indicates that cross origin request must be perform
      credentials: 'include', // indicates the user agent to include cookies from other domain
    })
    .then(response => (
      response.text()
          .then(text => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,
    }))))
    .then(({status, statusText, headers, body}) => {
      let json;
      try {
          json = JSON.parse(body);
      } catch (e) {
         // not json, no big deal
      }

      if (status < 200 || status >= 300) {
        return Promise.reject(new HttpError({statusText, ...json}, status));
      }
      return { status, headers, body, json };
    })
  );
};

export default HttpClient;