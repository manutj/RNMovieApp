import {API_KEY, API_HOST, LANG} from '../constants/constants';

export const getPopularMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
