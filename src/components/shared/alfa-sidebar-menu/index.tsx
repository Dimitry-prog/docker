import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { alfaSidebarMenuLinks } from '@/libs//constants.ts';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';

const cx = classNames.bind(styles);

const AlfaSidebarMenu = () => {
  const { role } = useUserInfo();
  const navigate = role === 'employee' ? `/pdp` : `/employees`;

  return (
    <aside className={cx('wrapper')}>
      <p>СЕРВИСЫ</p>

      <nav>
        <ul className={cx('list')}>
          <li>
            <Link to={navigate} className={cx('link')}>
              <img src="icons/pdp.svg" alt="ИПР" className={cx('icon')} />
              ИПР
            </Link>
          </li>
          {alfaSidebarMenuLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.href} className={cx('link')}>
                <img src={link.imgSrc} alt={link.label} className={cx('icon')} />
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/" className={cx('link')}>
              <img src="icons/next.svg" alt="Загрузить еще" className={cx('icon')} />
              <label className={cx('menu__text-gray')}>ещё 100</label>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AlfaSidebarMenu;
