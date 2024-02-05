import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetTemplateByIdQuery,
  useSetTemplateToUsersMutation,
} from '@/features/template/services';
import Loader from '@/components/shared/loader';
import Tag from '@/components/shared/tag';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import { useFilteredEmployees } from '@/features/user/hooks/use-filtered-employees.ts';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '@/libs/store.ts';
import { userActions } from '@/features/user/slices';
import { SetTemplateToUsersRequestType } from '@/features/template/types';
import Modal from '@/components/ui/modal';
import { useModal } from '@/shared/hooks/use-modal.ts';
import EmployeeTable from '@/features/user/components/employee-table';

const cx = classNames.bind(styles);

const SingleTemplate = () => {
  const [search, setSearch] = useState('');
  const [employeeIds, setEmployeeIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { name, onClose, onOpen } = useModal();
  const { data, isLoading } = useGetTemplateByIdQuery(id!);
  const [setTemplate, { isLoading: isLoadingSetTemplate }] = useSetTemplateToUsersMutation();
  const { employees, isLoading: isLoadingEmployees } = useFilteredEmployees();
  const fullName = `${data?.user.last_name} ${data?.user.first_name}`;
  const modalTitle =
    employeeIds.length > 1
      ? `Задачи добавлены в ИПР сотрудников`
      : `Задача «${name}» добавлена в ИПР ${fullName}`;
  const modalBody = (
    <p className={cx('modal')}>Чтобы продолжить работу с задачей, зайдите в ИПР сотрудника</p>
  );
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
  const dispatch = useAppDispatch();

  const handleToggleCheckbox = (id: number) => {
    const isExist = Boolean(employeeIds.find((empId) => empId === id));
    if (isExist) {
      setEmployeeIds(employeeIds.filter((empId) => empId !== id));
    } else {
      setEmployeeIds((prev) => [...prev, id]);
    }
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(userActions.setSearchQuery(e.target.value));
  };

  const handleSetTemplate = async () => {
    const body: SetTemplateToUsersRequestType = {
      users_ids: employeeIds,
      template_id: parseInt(id!),
    };
    await setTemplate(body);
    if (data) {
      onOpen(data.title);
    }
  };

  return (
    <>
      {(isLoading || isLoadingEmployees) && <Loader size="xl" />}

      <section className={cx('wrapper')}>
        {data ? (
          <div className={cx('header')}>
            <h2>{data.title}</h2>

            <div>
              <p>Направление</p>
              <h3>{data.direction.value}</h3>
            </div>

            <div>
              <p>Тип задачи</p>
              <h3>{data.type.value}</h3>
            </div>

            <div>
              <p>Содержание</p>
              <h3>{data.description}</h3>
            </div>

            <div>
              <p>Навыки</p>
              <ul className={cx('list')}>
                {data.skills.map((skill) => (
                  <li key={skill.id}>
                    <Tag label={skill.value} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p>Уровень</p>
              <Tag label={data.grade.value} />
            </div>

            <div>
              <p>Создатель</p>
              <h3>{fullName}</h3>
              <span>{data.user.position}</span>
            </div>
          </div>
        ) : null}

        {employees ? (
          <div className={cx('body')}>
            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Найти сотрудника"
              icon={<img src="/icons/lupa.svg" alt="Поиск" />}
              className={cx('search')}
            />

            {employees.length > 0 && (
              <>
                <EmployeeTable
                  employees={employees}
                  onChange={handleToggleCheckbox}
                  employeeIds={employeeIds}
                  isTemplate
                />

                <div className={cx('buttons')}>
                  <Button
                    onClick={handleSetTemplate}
                    variant="accent"
                    disabled={isLoadingSetTemplate || !employeeIds.length}
                  >
                    {isLoadingSetTemplate ? <Loader size="s" /> : 'Назначить задачу'}
                  </Button>

                  <Button onClick={() => navigate(-1)} variant="tertiary">
                    Отмена
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : null}

        {!employees.length && <p className={cx('empty')}>Ничего не найдено.</p>}
      </section>

      <Modal name={name} title={modalTitle} body={modalBody} footer={footerModal} />
    </>
  );
};

export default SingleTemplate;
