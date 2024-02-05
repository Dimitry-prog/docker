import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type ButtonProps = {
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent' | 'tertiary' | 'link';
  children?: ReactNode;
  size?: 's' | 'm' | 'l';
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  size = 'm',
  href,
  disabled,
  className,
  ...restProps
}: ButtonProps) => {
  const classes = cx('button', variant, size, [className]);

  return (
    <>
      {href ? (
        <Link to={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button type={type} disabled={disabled} className={classes} {...restProps}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
