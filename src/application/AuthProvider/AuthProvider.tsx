import { Spinner } from '@/components/Spinner/Spinner';
import { LOGGED_IN_AS } from '@/constants/localStorage';
import { useBackButton } from '@/hooks/useBackButton';
import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { apiService } from '@/services/ApiService';
import { AxiosClient } from '@/services/AxiosClient';
import {
  selectAuthLoading,
  selectCompanyListLoading,
} from '@/store/Loader/LoaderSelectors';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/cv/ResumeActions';
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
  useBackButton();

  const loading = useMemo(
    () => authLoading || companyListLoading,
    [authLoading, companyListLoading],
  );

  useMount(() => {
    // const user = {
    //   id: 460186752,
    //   first_name: 'Andrey',
    //   last_name: 'Nebogatikov',
    //   username: 'allpein',
    // };
    dispatch(UserAction.setUser(user));

    const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);
    apiService.init(axiosClient);

    if (token && token.tokenExpires > Date.now()) {
      axiosClient.init({ Authorization: 'Bearer ' + token.token });
      dispatch(UserAction.initCompanyList());
      dispatch(ResumeAction.getMyResumes());
    } else {
      if (user) {
        dispatch(
          UserAction.initAuth({
            user: {
              id: user.id,
            },
            client: axiosClient,
          }),
        );
      }
    }

    dispatch(
      UserAction.initLogin(
        localStorage.getItem(LOGGED_IN_AS) as 'company' | 'applicant',
      ),
    );
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
