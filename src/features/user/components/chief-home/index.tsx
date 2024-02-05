import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useGetEmployeesQuery } from '@/features/user/services';
import Loader from '@/components/shared/loader';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import EmployeeTable from '@/features/user/components/employee-table';

const cx = classNames.bind(styles);

const ChiefHome = () => {
  const { role } = useUserInfo();
  const { data: employees, isLoading } = useGetEmployeesQuery();

  return (
    <section className={cx('wrapper')}>
      <h2>Планы развития команды</h2>

      {isLoading && <Loader />}

      {employees && (
        <div className={cx('content')}>
          <EmployeeTable employees={employees} role={role} />
        </div>
      )}
    </section>
  );
};

export default ChiefHome;
