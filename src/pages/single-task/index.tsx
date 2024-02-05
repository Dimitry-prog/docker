import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useGetTaskByIdQuery } from '@/features/tasks/servises';
import Loader from '@/components/shared/loader';
import Button from '@/components/ui/button';
import Tag from '@/components/shared/tag';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';

const cx = classNames.bind(styles);

const SingleTaskPage = () => {
  const { id } = useParams();
  const { data: task, isLoading: isLoadingTask } = useGetTaskByIdQuery(id!);
  const { role } = useUserInfo();

  return (
    <section className={cx('wrapper')}>
      <h2>Мой индивидуальный план развития</h2>

      {isLoadingTask && <Loader size="xl" />}

      {task && (
        <div className={cx('content')}>
          <div className={cx('deadline')}>
            <div className={cx('info')}>
              <p>Дата начала</p>
              <h3>{task.starting_date}</h3>
            </div>

            <div className={cx('info')}>
              <p>Дата окончания</p>
              <h3>{task.deadline}</h3>
            </div>
          </div>

          <div className={cx('info')}>
            <p>Тип задачи</p>
            <h3>{task.type?.value}</h3>
          </div>

          <div className={cx('info')}>
            <p>Содержание</p>
            <h3>{task.description}</h3>
          </div>

          <div className={cx('skills')}>
            <h4>Навыки</h4>
            <ul className={cx('list')}>
              {task.skills.map((skill) => (
                <li key={skill.id}>
                  <Tag label={skill.value} />
                </li>
              ))}
            </ul>
          </div>

          <div className={cx('info')}>
            <p>Комментариий руководителя</p>
            <h3>{task.chief_comment}</h3>
          </div>

          <div className={cx('info')}>
            <p>Мой комментарий</p>
            <h3>{task.employee_comment}</h3>
          </div>
        </div>
      )}

      <div className={cx('buttons')}>
        <Button href="edit">Редактировать</Button>
        <Button href={role === 'employee' ? '/pdp' : '/employees'} variant="tertiary">
          Назад
        </Button>
      </div>
    </section>
  );
};

export default SingleTaskPage;
