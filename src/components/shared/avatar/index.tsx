import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type AvatarProps = {
  size?: 's' | 'm';
  src?: string;
};

const Avatar = ({ size = 's', src }: AvatarProps) => {
  return (
    <div className={cx('wrapper', size)}>
      <img
        src={src ? src : '/images/no_avatar.png'}
        alt="аватар пользователя"
        className={cx(size)}
      />
    </div>
  );
};

export default Avatar;
