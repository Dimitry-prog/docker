import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useGetPdpByIdQuery } from '@/features/pdp/services';
import Loader from '@/components/shared/loader';
import { useParams } from 'react-router-dom';
import Button from '@/components/ui/button';
import TasksTable from '@/features/tasks/components/tasks-table';
import UserGoal from '@/features/user/components/user-goal';
import UserInfo from '@/features/user/components/user-info';
import PdpForm from '@/features/pdp/components/pdp-form';
import { useAppSelector } from '@/libs/store.ts';
import { pdpSelectors } from '@/features/pdp/slices';

const cx = classNames.bind(styles);

const SingleEmployeePage = () => {
  const { id } = useParams();
  const signal = useAppSelector(pdpSelectors.getSignal);
  const { data: pdp, isLoading } = useGetPdpByIdQuery(id!);

  return (
    <section className={cx('wrapper')}>
      <h2>Индивидуальный план развития</h2>

      {isLoading && <Loader />}

      <div className={cx('content')}>
        <div className={cx('header')}>
          {pdp && pdp.goal !== '' && <UserGoal pdp={pdp} />}

          <UserInfo userId={pdp?.user_id as number} />
        </div>

        {((pdp && pdp.goal === '') || signal) && (
          <>
            <h2>{signal ? 'Редактирование ИПР' : 'Создание ИПР'}</h2>
            <PdpForm />
          </>
        )}

        {pdp && pdp.goal !== '' && <>{pdp.tasks.length > 0 && <TasksTable tasks={pdp.tasks} />}</>}

        {pdp && pdp.goal !== '' && !signal && (
          <Button variant="accent" href="create">
            Создать задачу
          </Button>
        )}
      </div>
    </section>
  );
};

export default SingleEmployeePage;
