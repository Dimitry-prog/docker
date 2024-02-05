import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useGetPdpByIdQuery } from '@/features/pdp/services';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import { UserRoleType } from '@/features/user/types';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '@/features/tasks/components/task-form';
import { useSetTaskToTemplateMutation } from '@/features/tasks/servises';
import Modal from '@/components/ui/modal';
import { useModal } from '@/shared/hooks/use-modal.ts';
import Button from '@/components/ui/button';

const cx = classNames.bind(styles);

const CreateTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pdp } = useGetPdpByIdQuery(id!);
  const { role } = useUserInfo();
  const { name, modalInfo, onClose } = useModal();
  const [setTask, { isLoading }] = useSetTaskToTemplateMutation();

  const footerModal = (
    <div className={cx('buttons')}>
      <Button
        onClick={async () => {
          await setTask({
            task_id: modalInfo as number,
          });
          onClose();
          navigate(-1);
        }}
        variant="accent"
        disabled={isLoading}
      >
        Да
      </Button>
      <Button
        onClick={() => {
          onClose();
          navigate(-1);
        }}
      >
        Нет
      </Button>
    </div>
  );

  return (
    <>
      <section className={cx('wrapper')}>
        <h2>Новая задача</h2>

        {pdp && <TaskForm type="create" pdpId={pdp.id} role={role as UserRoleType} />}
      </section>

      <Modal name={name} title="Сохранить задачу в шаблон?" footer={footerModal} />
    </>
  );
};

export default CreateTaskPage;
