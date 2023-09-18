import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repo, ServerRes, User } from '../types';

export const gitHubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<User[], string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 5,
        },
      }),
      transformResponse: (response: ServerRes<User>) => response.items,
    }),

    getUserRepos: build.query<Repo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`,
      }),
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = gitHubApi;
