export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';

/**
 * Request manager that build API calls and handles responses from API.
 * @param {Func} httpClient - HTTP client that return a fetch promise base on a given url and options
 */
const APIManager = (httpClient) => {
  /**
   * Function that computes the url to fetch and options to be used for fetching
   * @param {String} type - extended type of request
   * @param {String} APIBaseURL - url of the API to fetch data from    
   * @param {String} resource - resource to fetch
   * @param {Object} params - provided parameters
   */
  const makeOptions = (type, APIBaseURL, resource, params) => {
    let url;
    const options = {};
    
    switch (type) {
      case GET:
        url = `${APIBaseURL}/${resource}`;
        options.method = 'GET';
        break;
      
      case POST:
        url = `${APIBaseURL}/${resource}`;
        options.method = 'POST';
        options.body = JSON.stringify(params.data);
        break;
      
      case PUT:
        url = `${APIBaseURL}/${resource}`;
        options.method = 'PUT';
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
   * Function that handles responses from API
   * @param {Object} response - HTTP response
   * @param {String} type - extended type of request
   * @param {String} APIBaseURL - url of the API to fetch data from   
   * @param {String} resource - resource to fetch
   * @param {String} params - provided parameters
   */
  const handleResponse = (response, type, APIBaseURL, resource, params) => {
    switch (type) {
      default:
        return response && response.json ? response.json : undefined;
    }
  };

  /**
   * Function that handles errors from API
   * @param {Object} error - error 
   * @param {String} type - extended type of request
   * @param {String} APIBaseURL - url of the API to fetch data from       
   * @param {String} resource - resource to fetch
   * @param {String} params - provided parameters
   */
  const handleError = (error, type, APIBaseURL, resource, params) => {
    switch (type) {
      default:
        return Promise.reject(error);
    }
  };

  /**
   * Function that perform fetch
   * @param {String} type - extended type of request
   * @param {String} APIBaseURL - url of the API to fetch data from       
   * @param {String} resource - resource to fetch
   * @param {String} params - provided parameters
   */
  const manageFetch = (type, APIBaseURL, resource, params) => {
    const {
      url, 
      options
    } = makeOptions(type, APIBaseURL, resource, params);
    return (
      httpClient(url, options).then(
        response => handleResponse(response, type, APIBaseURL, resource, params),
        error => handleError(error, type, APIBaseURL, resource, params)
      )
    );
  };

  return manageFetch;
};

export default APIManager;