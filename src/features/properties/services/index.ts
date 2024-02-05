import { api } from '@/libs/api.ts';
import {
  CreatorType,
  DirectionType,
  GradeType,
  SkillType,
  StatusType,
  TypeType,
} from '@/features/properties/types';

export const propertyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDirections: builder.query<DirectionType[], void>({
      query: () => `api/v1/template_properties/direction`,
    }),
    getGrades: builder.query<GradeType[], void>({
      query: () => `/api/v1/template_properties/grade`,
    }),
    getCreators: builder.query<CreatorType[], void>({
      query: () => `/api/v1/template_properties/creators`,
    }),
    getSkills: builder.query<SkillType[], void>({
      query: () => `/api/v1/task_properties/skills/`,
    }),
    getStatuses: builder.query<StatusType[], void>({
      query: () => `/api/v1/task_properties/statuses`,
    }),
    getTypes: builder.query<TypeType[], void>({
      query: () => `/api/v1/task_properties/types`,
    }),
  }),
});

export const {
  useGetStatusesQuery,
  useGetTypesQuery,
  useGetSkillsQuery,
  useGetCreatorsQuery,
  useGetDirectionsQuery,
  useGetGradesQuery,
} = propertyApi;
