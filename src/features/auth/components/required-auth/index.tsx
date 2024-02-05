import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserInfo from '@/features/user/hooks/use-user-info.tsx';
import { useGetUserQuery } from '@/features/user/services';

const RequiredAuth = () => {
  const location = useLocation();
  const { token } = useUserInfo();
  useGetUserQuery();

  return <>{token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />}</>;
};

export default RequiredAuth;
