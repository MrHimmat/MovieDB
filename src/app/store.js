import { configureStore } from '@reduxjs/toolkit';
import movieReducer from "../reduxMovie/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});
