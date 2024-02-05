import { api } from '@/libs/api.ts';
import {
  RequestTemplateType,
  RequestUpdateTemplateType,
  SetTemplateToUsersRequestType,
  TemplateType,
} from '@/features/template/types';

export const templateApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query<TemplateType[], string | void>({
      query: (query = '') => `/api/v1/template/${query}`,
    }),
    getTemplateById: builder.query<TemplateType, string>({
      query: (templateId) => `/api/v1/template/${templateId}`,
    }),
    createTemplate: builder.mutation<TemplateType, RequestTemplateType>({
      query: (body) => ({
        url: `/api/v1/template`,
        method: 'POST',
        body,
      }),
    }),
    updateTemplateById: builder.mutation<TemplateType, RequestUpdateTemplateType>({
      query: (data) => ({
        url: `/api/v1/template/${data.templateId}`,
        method: 'PATCH',
        body: data.body,
      }),
    }),
    setTemplateToUsers: builder.mutation<null, SetTemplateToUsersRequestType>({
      query: (body) => ({
        url: `/api/v1/template/set_users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
  useCreateTemplateMutation,
  useSetTemplateToUsersMutation,
} = templateApi;
