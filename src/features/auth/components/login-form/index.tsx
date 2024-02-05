import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/features/auth/components/login-form/validation';
import Input from '@/components/ui/input';
import { useLoginMutation } from '../../services';
import { LoginRequestType } from '../../types';
import Loader from '@/components/shared/loader';

const cx = classNames.bind(styles);

const LoginForm = () => {
  const [login] = useLoginMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<LoginRequestType>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginRequestType> = async (data) => {
    const credentials = `username=${data.username}&password=${data.password}`;
    await login(credentials);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx('form')}>
      <h2>Представьтесь и входите скорее</h2>

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input label="" placeholder="email" {...field} error={errors.username?.message} />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input label="" placeholder="Пароль" {...field} error={errors.password?.message} />
        )}
      />

      <Button variant="accent" type="submit" disabled={isSubmitting} className={cx('button-auth')}>
        {isSubmitting ? <Loader size="s" /> : 'Вход'}
      </Button>
    </form>
  );
};

export default LoginForm;
