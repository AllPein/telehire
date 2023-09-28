import { useMount } from '@/hooks/useMount';
import { apiService } from '@/services/ApiService';
import { AxiosClient } from '@/services/AxiosClient';
import { companyService } from '@/services/CompanyService';
import { supabaseService } from '@/services/SupabaseService';
import { vacancyService } from '@/services/VacancyService';
import { UserAction } from '@/store/auth/UserActions';
import { token } from '@/utils/token';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useMount(() => {
    const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);
    apiService.init(axiosClient);

    if (token) {
      supabaseService.init(token);
      companyService.init(supabaseService);
      vacancyService.init(supabaseService);
    } else {
      dispatch(UserAction.initAuth());
    }
    // dispatch(
    //   UserAction.setUser({
    //     id: '279058397',
    //     first_name: 'Aleksandr',
    //     last_name: 'Panin',
    //   }),
    // );
  });

  return <>{children}</>;
};

export { AuthProvider };
