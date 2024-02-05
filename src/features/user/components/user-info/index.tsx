import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Avatar from '@/components/shared/avatar';
import { useFilteredEmployees } from '@/features/user/hooks/use-filtered-employees.ts';

const cx = classNames.bind(styles);

type UserInfoProps = {
  userId: number;
};

const UserInfo = ({ userId }: UserInfoProps) => {
  const { employees } = useFilteredEmployees();
  const user = employees.find((employee) => employee.id === userId);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('info')}>
        <Avatar size="m" />

        <div className={cx('name')}>
          <h3>{user?.last_name}</h3>
          <p>{user?.first_name}</p>
          <span>{user?.position}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
