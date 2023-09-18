import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Favourites, GitHubInitState } from '../types';
import { KEY_FAVOURITE_STORAGE } from '../../constants';

const initialState: GitHubInitState = {
  favourites: JSON.parse(localStorage.getItem(KEY_FAVOURITE_STORAGE) ?? '[]'),
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Favourites>) {
      state.favourites.push(action.payload);
      localStorage.setItem(KEY_FAVOURITE_STORAGE, JSON.stringify(state.favourites));
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(f => f.url !== action.payload);
      localStorage.setItem(KEY_FAVOURITE_STORAGE, JSON.stringify(state.favourites));
    },
    setRate(state, action: PayloadAction<Favourites>) {
      const newState = state.favourites.map(element => {
        element.url === action.payload.url && (element.rate = action.payload.rate);
        return element;
      });
      state.favourites = newState;
      localStorage.setItem(KEY_FAVOURITE_STORAGE, JSON.stringify(state.favourites));
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
