import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Tabs from '@/components/shared/tabs';
import { templateTabsMock } from '@/libs/constants.ts';
import Modal from '@/components/ui/modal';
import { useModal } from '@/shared/hooks/use-modal.ts';
import Button from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import TemplateForm from '@/features/template/components/template-form';

const cx = classNames.bind(styles);

const CreateTemplate = () => {
  const navigate = useNavigate();
  const { name, onClose } = useModal();
  const modalTitle = `Задача «${name}» сохранена в образец`;
  const modalBody = <p className={cx('modal')}>Вы можете просмотреть её в каталоге задач </p>;
  const footerModal = (
    <Button
      onClick={() => {
        onClose();
        navigate(-1);
      }}
      variant="accent"
    >
      ОК
    </Button>
  );

  return (
    <section className={cx('wrapper')}>
      <h2>Конструктор ИПР</h2>

      <Tabs tabs={templateTabsMock} />

      <h2>Новая задача</h2>

      <TemplateForm />

      <Modal name={name} title={modalTitle} body={modalBody} footer={footerModal} />
    </section>
  );
};

export default CreateTemplate;
