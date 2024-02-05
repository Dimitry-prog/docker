import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import Select from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import DatePicker from '@/components/ui/date-picker';
import Loader from '@/components/shared/loader';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/features/tasks/servises';
import { formattedDate } from '@/libs/utils.ts';
import { defaultValuesTaskFormData } from '@/libs/constants.ts';
import { TaskType } from '@/features/tasks/type';
import { UserRoleType } from '@/features/user/types';
import { TaskFormDataType, taskFormSchema } from '@/features/tasks/components/task-form/validation';
import { useProperties } from '@/features/properties/hooks/use-properties.ts';
import { useModal } from '@/shared/hooks/use-modal.ts';

const cx = classNames.bind(styles);

type TaskFormProps = {
  pdpId?: number;
  type: 'create' | 'update';
  task?: TaskType;
  role: UserRoleType;
};

const TaskForm = ({ pdpId, task, type, role }: TaskFormProps) => {
  const navigate = useNavigate();
  const { statuses, types, skills, isLoading } = useProperties();
  const { setInfo, onOpen } = useModal();
  const employeeStatuses =
    type === 'create' && role === 'employee'
      ? statuses.filter((status) => status.value !== 'Исполнена')
      : statuses.filter((status) => status.value !== 'Заявка');
  const isDisabledEditing = role === 'employee' && type === 'update';

  let updateDefValue;
  if (task) {
    const typeId = types.find((type) => type.id === task.type.id);
    const statusId = statuses.find((status) => status.id === task.status.id);
    const startingDate = new Date(task.starting_date).getTime();
    const deadline = new Date(task.deadline).getTime();

    updateDefValue = {
      type_id: typeId,
      status_id: statusId,
      title: task.title,
      description: task.description,
      skills: task.skills,
      employee_comment: task.employee_comment,
      chief_comment: task.chief_comment,
      starting_date: startingDate,
      deadline: deadline,
    };
  }

  const initialValues = type === 'update' && task ? updateDefValue : defaultValuesTaskFormData;
  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TaskFormDataType>({
    defaultValues: initialValues,
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit: SubmitHandler<TaskFormDataType> = async (data) => {
    let taskData = {};

    if (type === 'create') {
      if (role === 'employee') {
        taskData = {
          pdp_id: pdpId!,
          type_id: data.type_id?.id as number,
          title: data.title,
          description: data.description,
          employee_comment: data.employee_comment!,
          starting_date: data.starting_date
            ? formattedDate(data.starting_date)
            : formattedDate(new Date().getTime()),
          deadline: data.deadline
            ? formattedDate(data.deadline)
            : formattedDate(new Date().getTime()),
        };
      }

      if (role === 'chief') {
        taskData = {
          pdp_id: pdpId!,
          status_id: data.status_id.id,
          type_id: data.type_id?.id as number,
          title: data.title,
          description: data.description,
          skills: data.skills?.map((skill) => skill.value) || [],
          link: data.link!,
          chief_comment: data.chief_comment!,
          starting_date: data.starting_date
            ? formattedDate(data.starting_date)
            : formattedDate(new Date().getTime()),
          deadline: data.deadline
            ? formattedDate(data.deadline)
            : formattedDate(new Date().getTime()),
        };
      }

      await createTask(taskData)
        .unwrap()
        .then((res) => {
          setInfo(res.id);
          onOpen('saveToTemplate');
        });
    }

    if (type === 'update') {
      if (role === 'employee') {
        taskData = {
          pdp_id: pdpId!,
          status_id: data.status_id.id,
          employee_comment: data.employee_comment!,
        };
      }

      if (role === 'chief') {
        taskData = {
          pdp_id: pdpId!,
          status_id: data.status_id.id,
          type_id: data.type_id?.id as number,
          title: data.title,
          description: data.description,
          skills: data.skills?.map((skill) => skill.value) || [],
          link: data.link!,
          chief_comment: data.chief_comment!,
          starting_date: data.starting_date
            ? formattedDate(data.starting_date)
            : formattedDate(new Date().getTime()),
          deadline: data.deadline
            ? formattedDate(data.deadline)
            : formattedDate(new Date().getTime()),
        };
      }

      const updatedTask = {
        taskId: task?.id as number,
        body: taskData,
      };

      await updateTask(updatedTask);
      navigate(-1);
    }
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
                label="Название задачи"
                placeholder="Введите название задачи"
                {...field}
                disabled={isDisabledEditing || isSubmitting}
                error={errors.title?.message}
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
                  disabled={isDisabledEditing || isSubmitting}
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
                  disabled={isDisabledEditing || isSubmitting}
                  error={errors.deadline?.message}
                />
              )}
            />
          </div>

          <div className={cx('container')}>
            {types.length && (
              <Controller
                name="type_id"
                control={control}
                render={({ field }) => (
                  <Select
                    options={types}
                    onChange={field.onChange}
                    defaultValue={field.value?.value}
                    label="Тип задачи"
                    placeholder="Выберите тип задачи"
                    disabled={isDisabledEditing || isSubmitting}
                    error={errors.type_id?.value?.message}
                  />
                )}
              />
            )}

            {statuses.length && (
              <Controller
                name="status_id"
                control={control}
                render={({ field }) => (
                  <Select
                    options={role === 'employee' ? employeeStatuses : statuses}
                    onChange={field.onChange}
                    label="Статус"
                    defaultValue={field.value?.value}
                    placeholder="Выберите статус"
                    disabled={isSubmitting}
                    error={errors.status_id?.value?.message || errors.status_id?.message}
                  />
                )}
              />
            )}
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Содержание"
                placeholder="Подробно опишите задачу"
                {...field}
                disabled={isDisabledEditing || isSubmitting}
                error={errors.description?.message}
              />
            )}
          />

          {skills.length && (
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Select
                  options={skills}
                  onChange={field.onChange}
                  isMulti
                  isSearch
                  multiDefaultValues={field.value}
                  label="Навык"
                  placeholder="Выберите навык"
                  disabled={isDisabledEditing || isSubmitting}
                  error={errors.skills?.message}
                />
              )}
            />
          )}

          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <Input
                label="Ссылка"
                placeholder="Полезная ссылка"
                {...field}
                disabled={isDisabledEditing || isSubmitting}
                error={errors.link?.message}
              />
            )}
          />

          <Controller
            name="employee_comment"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Комментарий сотрудника"
                placeholder="В этом поле можете оставить коментарий"
                {...field}
                value={field.value as string}
                disabled={isSubmitting || role === 'chief'}
                error={errors.employee_comment?.message}
              />
            )}
          />

          <Controller
            name="chief_comment"
            control={control}
            render={({ field }) => (
              <Textarea
                label="Комментарий руководителя"
                placeholder="В этом поле можете оставить коментарий"
                {...field}
                value={field.value as string}
                disabled={isDisabledEditing || isSubmitting || role === 'employee'}
                error={errors.employee_comment?.message}
              />
            )}
          />

          <div className={cx('buttons')}>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader size="s" />
              ) : type === 'create' ? (
                'Создать задачу'
              ) : (
                'Обновить задачу'
              )}
            </Button>

            <Button onClick={() => navigate(-1)} variant="secondary">
              Выйти без сохранения
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default TaskForm;
