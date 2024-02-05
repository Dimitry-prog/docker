import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import ProgressBar from '@/components/shared/progress-bar';
import { PdpType } from '@/features/pdp/types';
import { useAppDispatch } from '@/libs/store.ts';
import { pdpActions } from '@/features/pdp/slices';
import { UserRoleType } from '@/features/user/types';

const cx = classNames.bind(styles);

type UserGoalProps = {
  pdp: PdpType;
  role?: UserRoleType;
};

const UserGoal = ({ pdp, role }: UserGoalProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className={cx('wrapper')}>
      <div>
        <span>цель развития</span>
        <p>{pdp.goal}</p>
      </div>

      <div>
        <span>состояние ИПР</span>
        {pdp.total > 0 ? <ProgressBar step={pdp.done} totalSteps={pdp.total} /> : <p>нет задач</p>}
      </div>

      <div>
        <span>Начало ИПР</span>
        <p>{pdp.starting_date}</p>
      </div>

      <div>
        <span>Дедлайн ИПР</span>
        <p>{pdp.deadline}</p>
      </div>

      {role === 'chief' && (
        <button
          onClick={() => dispatch(pdpActions.setStartQueryRequest(true))}
          type="button"
          className={cx('edit')}
        />
      )}
    </div>
  );
};

export default UserGoal;
