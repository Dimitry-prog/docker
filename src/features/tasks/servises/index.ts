import { api } from '@/libs/api.ts';
import { SetTaskToTemplateRequestType, TaskType, UpdateTaskType } from '../type';

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTaskById: builder.query<TaskType, string>({
      query: (id) => `/api/v1/task/${id}`,
    }),
    updateTask: builder.mutation<TaskType, UpdateTaskType>({
      query: (data) => ({
        url: `/api/v1/task/${data.taskId}`,
        method: 'PATCH',
        body: data.body,
      }),
      invalidatesTags: (result) => [{ type: 'Pdp', id: result?.pdp_id }],
    }),
    createTask: builder.mutation<
      TaskType,
      Partial<
        Omit<TaskType, 'skills'> & {
          type_id: number;
          status_id: number;
          skills: string[];
        }
      >
    >({
      query: (data) => ({
        url: `/api/v1/task`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result) => [{ type: 'Pdp', id: result?.pdp_id }],
    }),
    setTaskToTemplate: builder.mutation<null, SetTaskToTemplateRequestType>({
      query: (body) => ({
        url: `/api/v1/template/create_from_task`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useSetTaskToTemplateMutation,
} = tasksApi;
