import { api } from '@/libs/api.ts';
import { PdpType, UpdatePdpType } from '@/features/pdp/types';

export const pdpApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyPdp: builder.query<PdpType, void>({
      query: () => `/api/v1/pdp/my`,
    }),
    getPdpById: builder.query<PdpType, string>({
      query: (pdpId) => `/api/v1/pdp/${pdpId}`,
      providesTags: (result) => [{ type: 'Pdp', id: result?.id }],
    }),
    updatePdp: builder.mutation<PdpType, UpdatePdpType>({
      query: (data) => ({
        url: `/api/v1/pdp/${data.pdpId}`,
        method: 'PATCH',
        body: data.body,
      }),
      invalidatesTags: (result) => [{ type: 'Pdp', id: result?.id }, { type: 'Employees' }],
    }),
  }),
});

export const { useGetMyPdpQuery, useUpdatePdpMutation, useGetPdpByIdQuery } = pdpApi;
