import { configureStore } from '@reduxjs/toolkit';
import { gitHubApi } from './api/gitH.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { githubReducer } from './api/gitH.slice';

export const store = configureStore({
  reducer: {
    [gitHubApi.reducerPath]: gitHubApi.reducer,
    github: githubReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(gitHubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
