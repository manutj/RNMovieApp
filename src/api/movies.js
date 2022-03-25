import {API_KEY, API_HOST, LANG} from '../constants/constants';

export const getPopularMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const getTrailerMovieApi = movieId => {
  const url = `${API_HOST}/movie/${movieId}/videos?api_key=${API_KEY}&language=${LANG}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export const searchMovieApi = search => {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

export function getMovieByIdApi(movieId) {
  const url = `${API_HOST}/movie/${movieId}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    });
}
