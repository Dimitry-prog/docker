import { api } from '@/libs/api.ts';
import { EmployeeType, UpdateUserByIdType, UpdateUserType, UserType } from '@/features/user/types';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserType, void>({
      query: () => `/users/me`,
    }),
    getEmployees: builder.query<EmployeeType[], void>({
      query: () => `/api/v1/employees`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Employees' as const, id })),
              { type: 'Employees', id: 'LIST' },
            ]
          : [{ type: 'Employees', id: 'LIST' }],
    }),
    updateUser: builder.mutation<UserType, UpdateUserType>({
      query: (body) => ({
        url: `/users/me`,
        method: 'PATCH',
        body,
      }),
    }),
    getUserById: builder.query<UserType, string>({
      query: (id) => `/users/${id}`,
    }),
    updateUserById: builder.mutation<UserType, UpdateUserByIdType>({
      query: ({ body, id }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
    deleteUserById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetEmployeesQuery,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = userApi;
