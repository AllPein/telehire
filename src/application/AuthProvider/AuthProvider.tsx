import { Spinner } from '@/components/Spinner/Spinner';
import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { apiService } from '@/services/ApiService';
import { AxiosClient } from '@/services/AxiosClient';
import { companyService } from '@/services/CompanyService';
import { supabaseService } from '@/services/SupabaseService';
import { vacancyService } from '@/services/VacancyService';
import {
  selectAuthLoading,
  selectCompanyListLoading,
} from '@/store/Loader/LoaderSelectors';
import { UserAction } from '@/store/auth/UserActions';
import { token } from '@/utils/token';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);
  const companyListLoading = useSelector(selectCompanyListLoading);
  const { user } = useTelegram();

  const loading = useMemo(
    () => authLoading || companyListLoading,
    [authLoading, companyListLoading],
  );

  useMount(() => {
    // dispatch(UserAction.setUser(user));

    const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);
    apiService.init(axiosClient);

    if (token) {
      supabaseService.init(token);
      companyService.init(supabaseService);
      vacancyService.init(supabaseService);
      dispatch(UserAction.initCompanyList());
    } else {
      dispatch(UserAction.initAuth());
    }

    dispatch(
      UserAction.initLogin(
        localStorage.getItem('user_logged_in_as') as 'company' | 'applicant',
      ),
    );
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
