import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { InputHTMLAttributes, ReactNode } from 'react';

const cx = classNames.bind(styles);

type InputProps = {
  name?: string;
  type?: string;
  label?: string;
  error?: string;
  className?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  type = 'text',
  name,
  label,
  error,
  placeholder,
  disabled,
  className = '',
  icon,
  ...restProps
}: InputProps) => {
  const classes = cx('input', error && 'invalid', icon && 'pl', [className]);

  return (
    <div className={cx('wrapper')}>
      {label && (
        <label htmlFor={`input-${name}`} className={cx('label')}>
          {label}
        </label>
      )}

      <div className={cx('container')}>
        {icon && <div className={cx('icon')}>{icon}</div>}

        <input
          type={type}
          id={`input-${name}`}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          className={classes}
          {...restProps}
        />

        {error && <span className={cx('error')}>{error}</span>}
      </div>
    </div>
  );
};

export default Input;
