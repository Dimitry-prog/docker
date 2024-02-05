import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Avatar from '../avatar';
import Input from '@/components/ui/input';
import { headerLinks } from '@/libs/constants';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/components/shared/logo';
import Notification from '../notification';
import Dropdown from '@/components/ui/dropdown';
import { useState } from 'react';
import { useLogoutMutation } from '@/features/auth/services';

const cx = classNames.bind(styles);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const { pathname } = useLocation();

  return (
    <header className={cx('header')}>
      <Logo />
      <nav className={cx('menu')}>
        <ul className={cx('menu-list')}>
          {headerLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.href} className={cx('menu-item', pathname == link.href && 'active')}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={cx('wrapper')}>
        <Input
          type="text"
          icon={<img src="/icons/lupa.svg" alt="поиск" />}
          placeholder="Поиск"
          className={cx('input')}
        />
        <Notification />

        <Dropdown
          isOpen={isOpen}
          trigger={
            <div onClick={() => setIsOpen(!isOpen)}>
              <Avatar />
            </div>
          }
          onClose={() => setIsOpen(!isOpen)}
          style={{ width: 'max-content' }}
        >
          <ul className={cx('list')}>
            <li
              onClick={async () => {
                await logout();
              }}
              className={cx('item')}
            >
              Выйти из аккаунта
            </li>
          </ul>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
