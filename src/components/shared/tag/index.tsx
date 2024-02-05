import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type TagProps = {
  label: string;
};

const Tag = ({ label }: TagProps) => {
  return (
    <div className={cx('wrapper')}>
      <h5>{label}</h5>
    </div>
  );
};

export default Tag;
