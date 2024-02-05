import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { TextareaHTMLAttributes } from 'react';

const cx = classNames.bind(styles);

type TextareaProps = {
  label?: string;
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ label, error, className = '', disabled, ...restProps }: TextareaProps) => {
  const classes = cx('textarea', error && 'invalid', [className]);

  return (
    <div className={cx('wrapper')}>
      {label && <span className={cx('label')}>{label}</span>}

      <textarea className={classes} disabled={disabled} {...restProps} />

      {error && <span className={cx('error')}>{error}</span>}
    </div>
  );
};

export default Textarea;
