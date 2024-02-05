import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

const HomePage = () => {
  return (
    <div className={cx('wrapper')}>
      <img src="/images/alfa-home.png" alt="стартовый экран" />
    </div>
  );
};

export default HomePage;
