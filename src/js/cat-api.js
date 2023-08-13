import axios from 'axios';

const API_KEY =
  'live_kQ3xSxI2d2hEoSeyvrkaCgKCV4XKaxPVyLDni3g74HaYr3wZoHnycCzTfHH44UaX';
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY;


function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`).then(response => {
    if (response.status !== 200) {
      throw new Error('Error message');
    }
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error('Error message');
      }
      return response.data;
    });
}

export { fetchBreeds, fetchCatByBreed };

