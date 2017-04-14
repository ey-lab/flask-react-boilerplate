export const GET = 'GET';
export const LOGOUT = 'LOGOUT';
export const GET_ONE = 'GET_ONE';
export const POST = 'POST';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

/**
 * Request manager that build API calls and handles responses from API.
 * @param {String} apiURL url of the API to fetch data from 
 * @param {Func} httpClient an HTTP client that return a fetch promise base on a given url and options
 */
const apiClient = (apiURL, httpClient) => {
  /**
   * Function that build the request
   * @param {String} type of action to fetch (GET, GET_ONE, CREATE, UPDATE, DELETE, etc.)
   * @param {String} resource to fetch from the API
   * @param {Object} params useful paramters (maybe optional depending on type)
   */
  const buildRequest = (type, resource, params) => {
    let url;
    const options = {};
    
    switch (type) {
      case GET:
        url = `${apiURL}/${resource}`;
        options.method = 'GET';
        break;
      
      case LOGOUT:
        url = `${apiURL}/${resource}`;
        options.method = 'PUT'
        break;

      case GET_ONE:
        url = `${apiURL}/${resource}/${params.id}`;
        options.method = 'GET';
        break;
      
      case POST:
        url = `${apiURL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;

      case CREATE:
        url = `${apiURL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      
      case UPDATE:
        url = `${apiURL}/${resource}/${params.id}`;
        options.method = 'PUT';
        options.body = JSON.stringify(params.data);
        break;
      
      case DELETE:
        url = `${apiURL}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;

      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }

    if (params && params.csrfToken) {
      options.csrfToken = params.csrfToken
    }

    return {url, options};
  };

  /**
   * Function that handles responses from api.It can have specific behaviors depending on the API call
   * @param {Object} response HTTP response from fetch()
   * @param {String} type of action to fetch (GET, GET_ONE, CREATE, UPDATE, DELETE, etc.)
   * @param {String} resource to fetch from the API
   * @param {String} params useful parameters (maybe optional depending on type)
   */
  const handleResponse = (response, type, resource, params) => {
    switch (type) {
      default:
        return response && response.json ? response.json : undefined;
    }
  };

  const handleError = (error, type, resource, params) => {
    switch (type) {
      default:
        return Promise.reject(error);
    }
  };

  return (type, resource, params) => {
    const {url, options} = buildRequest(type, resource, params);
    return httpClient(url, options)
    .then(
      response => handleResponse(response, type, resource, params),
      error => handleError(error, type, resource, params)
    );
  }
};

export default apiClient;