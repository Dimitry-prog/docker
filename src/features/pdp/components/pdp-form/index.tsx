import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '@/components/ui/date-picker';
import Loader from '@/components/shared/loader';
import { PdpFormDataType, pdpFormSchema } from '@/features/pdp/components/pdp-form/validation';
import { useParams } from 'react-router-dom';
import { useGetPdpByIdQuery, useUpdatePdpMutation } from '@/features/pdp/services';
import { formattedDate } from '@/libs/utils.ts';
import { pdpActions } from '@/features/pdp/slices';
import { useAppDispatch } from '@/libs/store.ts';

const cx = classNames.bind(styles);

const PdpForm = () => {
  const { id } = useParams();
  const { data: pdp, isLoading } = useGetPdpByIdQuery(id!);
  const [update] = useUpdatePdpMutation();
  const dispatch = useAppDispatch();

  const initialValues =
    pdp?.goal === ''
      ? {
          goal: '',
        }
      : {
          goal: pdp?.goal,
          starting_date: new Date(pdp?.starting_date as string).getTime(),
          deadline: new Date(pdp?.deadline as string).getTime(),
        };
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<PdpFormDataType>({
    defaultValues: initialValues,
    resolver: zodResolver(pdpFormSchema),
  });

  const onSubmit: SubmitHandler<PdpFormDataType> = async (data) => {
    const pdpData = {
      pdpId: pdp?.id as number,
      body: {
        goal: data.goal,
        starting_date: formattedDate(data.starting_date),
        deadline: formattedDate(data.deadline),
      },
    };

    await update(pdpData);
    dispatch(pdpActions.setStartQueryRequest(false));
  };

  return (
    <>
      {isLoading ? (
        <Loader size="xl" />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={cx('wrapper')}>
          <Controller
            name="goal"
            control={control}
            render={({ field }) => (
              <Input
                label="Цель"
                placeholder="Введите название цели"
                {...field}
                disabled={isSubmitting}
                error={errors.goal?.message}
              />
            )}
          />

          <div className={cx('container')}>
            <Controller
              name="starting_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value as number}
                  onChange={field.onChange}
                  label="Дата начала"
                  placeholder="Выберите дату"
                  disabled={isSubmitting}
                  error={errors.starting_date?.message}
                />
              )}
            />

            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  value={field.value as number}
                  onChange={field.onChange}
                  label="Дата окончания"
                  placeholder="Выберите дату"
                  disabled={isSubmitting}
                  error={errors.deadline?.message}
                />
              )}
            />
          </div>

          <div className={cx('buttons')}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader size="s" />
              ) : pdp?.goal === '' ? (
                'Создать ИПР'
              ) : (
                'Редактировать ИПР'
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default PdpForm;
