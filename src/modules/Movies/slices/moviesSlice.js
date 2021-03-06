import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
  },

  reducers: {
    fetchMovies(state, action) {
      state.data = action.payload.results;
    },
  },
});

const fetchMoviesData = (options) => async (dispatch) => {
  const genres = options.genres
    .reduce((acc, item) => {
      if (item.isSelected) acc.push(item.id);

      return acc;
    }, [])
    .join(',');

  const response = await axios.get('/.netlify/functions/tmdb', {
    params: {
      path: 'discover/movie',
      sort_by: options.sortBy,
      'primary_release_date.gte': options.releaseDates.from,
      'primary_release_date.lte': options.releaseDates.to,
      with_genres: genres,
      'vote_average.gte': options.userScoreRange[0],
      'vote_average.lte': options.userScoreRange[1],
    },
  });

  dispatch(moviesSlice.actions.fetchMovies(response.data));
};

export const moviesActions = { ...moviesSlice.actions, fetchMoviesData };
export default moviesSlice.reducer;
