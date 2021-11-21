const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const getAPI = () => (
  fetch(APIURL)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise
          .resolve(json) : Promise.reject(json)))
    ))
);

export default getAPI;
