import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { loginFooterLinks } from '@/libs/constants.ts';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const LoginFooter = () => {
  return (
    <footer className={cx('wrapper')}>
      <nav>
        <ul className={cx('list')}>
          {loginFooterLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default LoginFooter;
