import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { InputHTMLAttributes } from 'react';

const cx = classNames.bind(styles);

type CheckboxProps = {
  name?: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ name, checked, className, onChange, error, ...restProps }: CheckboxProps) => {
  const classes = cx('checkbox', [className]);

  return (
    <div className={classes}>
      <input name={name} checked={checked} onChange={onChange} type="checkbox" {...restProps} />
      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
};

export default Checkbox;
