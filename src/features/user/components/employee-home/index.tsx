import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Button from '@/components/ui/button';
import { useGetMyPdpQuery } from '@/features/pdp/services';
import Loader from '@/components/shared/loader';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import TasksTable from '@/features/tasks/components/tasks-table';
import UserGoal from '@/features/user/components/user-goal';

const cx = classNames.bind(styles);

const EmployeeHome = () => {
  const { role } = useUserInfo();
  const { data: pdp, isLoading } = useGetMyPdpQuery();

  return (
    <section className={cx('wrapper')}>
      <h2>Мой индивидуальный план развития</h2>

      {isLoading && <Loader />}

      {!pdp && <p className={cx('empty')}>План развития еще не создан. Подайте заявку</p>}

      {pdp && (
        <div className={cx('content')}>
          <UserGoal pdp={pdp} role={role} />

          <TasksTable tasks={pdp.tasks} role={role} />
        </div>
      )}

      <Button variant="accent" className={cx('button')} href={`${pdp?.id}/tasks/create`}>
        Подать заявку
      </Button>
    </section>
  );
};

export default EmployeeHome;
