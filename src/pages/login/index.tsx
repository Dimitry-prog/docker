import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Logo from '@/components/shared/logo';
import LoginForm from '@/features/auth/components/login-form';
import LoginFooter from '@/features/auth/components/login-footer';
import Modal from '@/components/ui/modal';

const cx = classNames.bind(styles);

const LoginPage = () => {
  return (
    <>
      <section className={cx('wrapper')}>
        <header>
          <Logo />
        </header>

        <div className={cx('content')}>
          <LoginForm />
        </div>

        <LoginFooter />
      </section>

      <Modal name="error" title="Error" />
    </>
  );
};

export default LoginPage;
