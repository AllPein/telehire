import { useMount } from '@/hooks/useMount';
import { apiService } from '@/services/ApiService';
import { AxiosClient } from '@/services/AxiosClient';
import { AuthAction } from '@/store/auth/AuthActions';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  useMount(() => {
    console.log('auth');
    const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);

    apiService.init(axiosClient);
    dispatch(AuthAction.initAuth());
  });
  return <>{children}</>;
};

export { AuthProvider };
