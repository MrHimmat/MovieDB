import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const buildUrl = (type, param = '', page = 1) => {
  switch (type) {
    case 'popular':
      return `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    case 'top_rated':
      return `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    case 'upcoming':
      return `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
    case 'search':
      return `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${param}&page=${page}`;
    case 'detail':
      return `${BASE_URL}/movie/${param}?api_key=${API_KEY}&language=en-US`;
    case 'credits':
      return `${BASE_URL}/movie/${param}/credits?api_key=${API_KEY}&language=en-US`;
    default:
      return '';
  }
};

// Thunks
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ type, query = '', page = 1 }) => {
    const url = buildUrl(type, query, page);
    const response = await axios.get(url);
    return { data: response.data, type };
  }
);

export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (movieId) => {
    const detailUrl = buildUrl('detail', movieId);
    const creditsUrl = buildUrl('credits', movieId);
    const [detailRes, creditsRes] = await Promise.all([
      axios.get(detailUrl),
      axios.get(creditsUrl),
    ]);
    return {
      detail: detailRes.data,
      cast: creditsRes.data.cast,
    };
  }
);

// Slice
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    detail: null,
    cast: [],
    status: 'idle',
    error: null,
    totalPages: 1,
    currentPage: 1,
    type: 'popular', // default type
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data.results;
        state.totalPages = action.payload.data.total_pages;
        state.type = action.payload.type;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.detail = action.payload.detail;
        state.cast = action.payload.cast;
      });
  },
});

export const { setPage } = movieSlice.actions;
export default movieSlice.reducer;
