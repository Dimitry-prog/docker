import { useGetTemplatesQuery } from '@/features/template/services';
import { useAppSelector } from '@/libs/store.ts';
import { templateSelectors } from '@/features/template/slices';
import { convertTemplateQuery } from '@/libs/utils.ts';

export const useFilteredTemplates = () => {
  const query = useAppSelector(templateSelectors.getTemplateQuery);
  const convertedQuery = convertTemplateQuery(query);
  const { data, isLoading } = useGetTemplatesQuery(convertedQuery);

  return {
    templates: data,
    isLoading,
  };
};
