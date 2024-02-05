import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '@/components/ui/select';
import Loader from '@/components/shared/loader';
import { TemplateQueryType } from '@/features/template/types';
import { useAppDispatch } from '@/libs/store.ts';
import { templateActions } from '@/features/template/slices';
import { useProperties } from '@/features/properties/hooks/use-properties.ts';
import {
  FilterTemplateFormDataType,
  filterTemplateFormSchema,
} from '@/features/template/components/filter-template-form/validation';

const cx = classNames.bind(styles);

const FilterTemplateForm = () => {
  const { directions, creators, grades, skills, types, isLoading } = useProperties();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FilterTemplateFormDataType>({
    resolver: zodResolver(filterTemplateFormSchema),
  });

  const onSubmit: SubmitHandler<FilterTemplateFormDataType> = (data) => {
    const query: TemplateQueryType = {
      q: data.title,
      direction: data?.direction?.id || '',
      type: data.type?.id || '',
      creator: data.creator?.value || '',
      skills: data.skills?.map((skill) => skill.id) || [],
      grade: data.grade?.map((grade) => grade.id) || [],
    };
    dispatch(templateActions.setQuery(query));
    dispatch(templateActions.setStartQueryRequest(true));
  };

  return (
    <>
      {isLoading ? (
        <Loader size="xl" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('wrapper')}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                label="Поиск задачи"
                placeholder="Текст"
                icon={<img src="/icons/lupa.svg" alt="Поиск" />}
                {...field}
                disabled={isSubmitting}
                error={errors.title?.message}
              />
            )}
          />

          <div className={cx('container')}>
            {directions.length > 0 && (
              <Controller
                name="direction"
                control={control}
                render={({ field }) => (
                  <Select
                    options={directions}
                    onChange={field.onChange}
                    label="Направление обучения"
                    placeholder="Выберите направление"
                    disabled={isSubmitting}
                    error={errors.direction?.value?.message}
                  />
                )}
              />
            )}

            {types.length > 0 && (
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    options={types}
                    onChange={field.onChange}
                    label="Тип задачи"
                    placeholder="Выберите тип задачи"
                    disabled={isSubmitting}
                    error={errors.type?.value?.message}
                  />
                )}
              />
            )}
          </div>

          <div className={cx('container')}>
            {skills.length > 0 && (
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Select
                    options={skills}
                    onChange={field.onChange}
                    isMulti
                    isSearch
                    label="Навык"
                    placeholder="Выберите навык"
                    disabled={isSubmitting}
                    error={errors.skills?.message}
                  />
                )}
              />
            )}

            {grades.length > 0 && (
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <Select
                    options={grades}
                    onChange={field.onChange}
                    isMulti
                    isSearch
                    label="Уровень"
                    placeholder="Выберите уровень"
                    disabled={isSubmitting}
                    error={errors.grade?.message}
                  />
                )}
              />
            )}
          </div>

          {creators.length > 0 && (
            <Controller
              name="creator"
              control={control}
              render={({ field }) => (
                <Select
                  options={creators}
                  onChange={field.onChange}
                  label="Создатель"
                  placeholder="Выберите название должности"
                  disabled={isSubmitting}
                  error={errors.creator?.value?.message}
                />
              )}
            />
          )}

          <div className={cx('buttons')}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? <Loader size="s" /> : 'Найти'}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default FilterTemplateForm;
