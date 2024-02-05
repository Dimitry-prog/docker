import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Logo = () => {
  return (
    <Link to="/" className={cx('logo')}>
      <img className={cx('logo__image')} src="/images/logo_image.svg" alt="Логотип" />
      <p className={cx('logo__text')}>Alfa People</p>
    </Link>
  );
};

export default Logo;
