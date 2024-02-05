import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { TemplateType } from '@/features/template/types';

const cx = classNames.bind(styles);

type TemplateTableProps = {
  templates: TemplateType[];
};

const TemplateTable = ({ templates }: TemplateTableProps) => {
  return (
    <table className={cx('wrapper')}>
      <thead className={cx('head')}>
        <tr>
          <th>№</th>
          <th>Название задачи</th>
          <th>Уровень</th>
          <th>Типы задачи</th>
          <th>Навыки</th>
          <th>Создатель</th>
          <th />
        </tr>
      </thead>
      <tbody className={cx('body')}>
        {templates.map((template, index) => (
          <tr key={template.id} className={cx('rows')}>
            <td>{index + 1}</td>
            <td>{template.title}</td>
            <td>{template.grade.value}</td>
            <td>{template.type.value}</td>
            <td>{template.skills.map((skill) => skill.value).join(' ')}</td>
            <td>{template.user.last_name}</td>
            <td>
              <Link to={`${template.id}`} className={cx('view')} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TemplateTable;
