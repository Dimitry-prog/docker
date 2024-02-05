import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import { UserRoleType } from '@/features/user/types';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '@/components/shared/loader';
import { useGetPdpByIdQuery } from '@/features/pdp/services';
import { useGetTaskByIdQuery } from '@/features/tasks/servises';
import TaskForm from '@/features/tasks/components/task-form';

const cx = classNames.bind(styles);

const EditTaskPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const pdpId = pathname.split('/')[2];
  const { data: pdp, isLoading: isLoadingPdp } = useGetPdpByIdQuery(pdpId!);
  const { data: task, isLoading: isLoadingTask } = useGetTaskByIdQuery(id!);
  const { role } = useUserInfo();

  return (
    <section className={cx('wrapper')}>
      {isLoadingPdp || (isLoadingTask && <Loader size="xl" />)}

      {pdp && task && (
        <>
          <h2>{task.title}</h2>

          <TaskForm type="update" pdpId={pdp.id} task={task} role={role as UserRoleType} />
        </>
      )}
    </section>
  );
};

export default EditTaskPage;
