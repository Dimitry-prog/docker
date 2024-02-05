import {
  useGetCreatorsQuery,
  useGetDirectionsQuery,
  useGetGradesQuery,
  useGetSkillsQuery,
  useGetStatusesQuery,
  useGetTypesQuery,
} from '@/features/properties/services';

export const useProperties = () => {
  const { data: directions, isLoading: isLoadingDirections } = useGetDirectionsQuery();
  const { data: grades, isLoading: isLoadingGrades } = useGetGradesQuery();
  const { data: creators, isLoading: isLoadingCreators } = useGetCreatorsQuery();
  const { data: statuses, isLoading: isLoadingStatuses } = useGetStatusesQuery();
  const { data: types, isLoading: isLoadingTypes } = useGetTypesQuery();
  const { data: skills, isLoading: isLoadingSkills } = useGetSkillsQuery();

  const isLoading =
    isLoadingDirections ||
    isLoadingGrades ||
    isLoadingCreators ||
    isLoadingStatuses ||
    isLoadingTypes ||
    isLoadingSkills;

  return {
    directions: directions ? directions : [],
    grades: grades ? grades : [],
    creators: creators
      ? creators.map((creator) => ({
          id: creator.id,
          value: `${creator.first_name} ${creator.last_name}`,
        }))
      : [],
    statuses: statuses ? statuses : [],
    types: types ? types : [],
    skills: skills ? skills : [],
    isLoading,
  };
};
