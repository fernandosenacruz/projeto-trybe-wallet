const APIURL = 'https://economia.awesomeapi.com.br/json/all';

// talvez precise expecificar qual a moeda. fazer depois.
export default getAPI = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise
          .resolve(json) : Promise.reject(json)))
    ))
);
