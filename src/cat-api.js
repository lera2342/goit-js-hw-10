import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_oIzu4DkZnU1Nteocf86gYOXbmEX10rJPns4mbtyo2IexBQgj3zPuPDfeUyeScRLu';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0]);
}
