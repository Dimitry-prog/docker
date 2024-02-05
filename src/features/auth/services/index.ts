import { api } from '@/libs/api.ts';
import { LoginResponseType } from '@/features/auth/types';
import { UserType } from '@/features/user/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseType, string>({
      query: (body) => ({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        url: `/auth/jwt/login`,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/auth/jwt/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation<UserType, Omit<UserType, 'id'>>({
      query: (body) => ({
        url: `/auth/register`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
