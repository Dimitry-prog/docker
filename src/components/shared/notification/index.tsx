import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const Notification = () => {
  return <img className={cx('notification')} src="/icons/icon_btn.svg" alt="Колокольчик" />;
};

export default Notification;
