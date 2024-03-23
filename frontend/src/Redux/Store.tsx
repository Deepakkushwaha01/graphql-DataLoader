import { configureStore } from '@reduxjs/toolkit';
import articleSlice from './Slice'; 

export const store = configureStore({
  reducer: {
    articles: articleSlice,
  },
});