import { useAppSelector } from '@/libs/store.ts';
import { authSelectors } from '@/features/auth/slices';
import { userSelectors } from '@/features/user/slices';

const useUserInfo = () => {
  const userInfo = useAppSelector(userSelectors.getCurrentUser);
  const token = useAppSelector(authSelectors.getToken);

  return {
    ...userInfo,
    token,
  };
};

export default useUserInfo;
