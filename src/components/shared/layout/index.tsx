import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarMenu from '@/components/shared/sidebar-menu';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import { UserRoleType } from '@/features/user/types';
import AlfaSidebarMenu from '@/components/shared/alfa-sidebar-menu';

const cx = classNames.bind(styles);

const Layout = () => {
  const { pathname } = useLocation();
  const { role } = useUserInfo();

  return (
    <div className={cx('wrapper')}>
      <Header />

      <div className={cx('container')}>
        {pathname === '/' ? <AlfaSidebarMenu /> : <SidebarMenu role={role as UserRoleType} />}

        <main className={cx('main')}>
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
