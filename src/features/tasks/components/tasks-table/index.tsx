import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { selectStatus } from '@/libs/utils.ts';
import { UserRoleType } from '@/features/user/types';
import { TaskType } from '@/features/tasks/type';

const cx = classNames.bind(styles);

type TasksTableProps = {
  tasks: TaskType[];
  role?: UserRoleType;
};
const TasksTable = ({ tasks, role }: TasksTableProps) => {
  return (
    <table className={cx('table')}>
      <thead className={cx('table-head')}>
        <tr className={cx('heading')}>
          <th className={cx('head-cell', 'min-width')}>№</th>
          <th className={cx('head-cell')}>Название задачи</th>
          <th className={cx('head-cell')}>Начало</th>
          <th className={cx('head-cell')}>Окончание</th>
          <th className={cx('head-cell')}>Типы задач</th>
          <th className={cx('head-cell')}>Статус</th>
          <th className={cx('head-cell')} />
        </tr>
      </thead>
      <tbody className={cx('table-body')}>
        {tasks.map((task, index) => (
          <tr key={task.id} className={cx('rows')}>
            <td className={cx('row')}>{index + 1}</td>
            <td className={cx('row')}>{task.title}</td>
            <td className={cx('row')}>{task.starting_date}</td>
            <td className={cx('row')}>{task.deadline}</td>
            <td className={cx('row')}>{task.type?.value}</td>
            <td className={cx('row')}>
              <div className={cx('link', selectStatus(task.status.value))}>{task.status.value}</div>
            </td>
            <td className={cx('row')}>
              <div className={cx('links')}>
                <Link
                  to={role === 'employee' ? `${task.pdp_id}/tasks/${task.id}` : `${task.id}`}
                  className={cx('view')}
                />
                <Link
                  to={
                    role === 'employee' ? `${task.pdp_id}/tasks/${task.id}/edit` : `${task.id}/edit`
                  }
                  className={cx(
                    'edit',
                    task.status.value === 'Заявка' && role === 'employee' && 'edit_hidden'
                  )}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksTable;
