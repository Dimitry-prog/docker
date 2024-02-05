import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import Avatar from '@/components/shared/avatar';
import ProgressBar from '@/components/shared/progress-bar';
import Checkbox from '@/components/ui/checkbox';
import { EmployeeType, UserRoleType } from '@/features/user/types';
import { useState } from 'react';

const cx = classNames.bind(styles);

type EmployeeTableProps = {
  employees: EmployeeType[];
  employeeIds?: number[];
  onChange?: (id: number) => void;
  isTemplate?: boolean;
  role?: UserRoleType;
};

const EmployeeTable = ({
  employees,
  onChange,
  employeeIds,
  isTemplate = false,
  role = 'employee',
}: EmployeeTableProps) => {
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeType[]>(employees);
  const [sortConfig, setSortConfig] = useState<'asc' | 'desc'>('asc');

  const handleSortingByDone = () => {
    const filteredDone = [...filteredEmployees].sort((a, b) => {
      if (sortConfig === 'asc') {
        return a.pdp.done - b.pdp.done;
      } else {
        return b.pdp.done - a.pdp.done;
      }
    });

    setSortConfig(sortConfig === 'asc' ? 'desc' : 'asc');
    setFilteredEmployees(filteredDone);
  };

  return (
    <table className={cx('wrapper')}>
      <thead className={cx('head')}>
        <tr>
          {isTemplate && <th />}
          <th>Сотрудник</th>
          <th>
            <div className={cx('emp')}>
              Состояние ИПР
              <button
                onClick={handleSortingByDone}
                type="button"
                className={cx('sort', sortConfig === 'asc' && 'sort_desc')}
              />
            </div>
          </th>
          <th>Срок ИПР</th>
          {!isTemplate && <th />}
        </tr>
      </thead>
      <tbody className={cx('body')}>
        {filteredEmployees.map((employee) => (
          <tr key={employee.id} className={cx('rows')}>
            {isTemplate && (
              <td>
                <Checkbox
                  name={employee.id.toString()}
                  checked={Boolean(employeeIds?.find((id) => id === employee.id))}
                  onChange={() => {
                    if (onChange) {
                      onChange(employee.id);
                    }
                  }}
                  className={cx('checkbox')}
                />
              </td>
            )}
            <td>
              <div className={cx('person')}>
                <Avatar />
                <div className={cx('info')}>
                  <h5>
                    {employee.first_name} {employee.last_name}
                  </h5>
                  <span>{employee.position}</span>
                </div>
              </div>
            </td>
            <td>
              <>
                {employee.pdp.goal === '' && (
                  <div className={cx('status')}>
                    <img src="/icons/no-pdp.svg" alt="Нет ИПР" />
                    <p>Нет ИПР</p>
                  </div>
                )}
                {employee.pdp.goal !== '' && employee.pdp.total !== 0 && (
                  <ProgressBar
                    step={employee.pdp.done}
                    totalSteps={employee.pdp.total}
                    className={cx('progress')}
                  />
                )}
                {employee.pdp.goal !== '' && employee.pdp.total === 0 && (
                  <div className={cx('status')}>
                    <img src="/icons/no-pdp.svg" alt="Нет ИПР" />
                    <p>Нет задач</p>
                  </div>
                )}
              </>
            </td>
            <td>
              <div className={cx('deadline', isTemplate && 'deadline_view')}>
                {employee.pdp.goal === '' ? <p>нет</p> : <p>{employee.pdp.deadline}</p>}
              </div>
            </td>
            {!isTemplate && (
              <td>
                <Link
                  to={role === 'employee' ? `${employee.pdp.id}` : `${employee.pdp.id}/tasks`}
                  className={cx('view')}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
