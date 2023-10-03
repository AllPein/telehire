import { Spinner } from '@/components/Spinner/Spinner';
import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
import { apiService } from '@/services/ApiService';
import { AxiosClient } from '@/services/AxiosClient';
import {
  selectAuthLoading,
  selectCompanyListLoading,
} from '@/store/Loader/LoaderSelectors';
import { UserAction } from '@/store/auth/UserActions';
import { history } from '@/utils/history';
import { token, tokenAlive } from '@/utils/token';
import { FC, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);
  const companyListLoading = useSelector(selectCompanyListLoading);
  const { tg } = useTelegram();

  const onClick = () => history.push('/');

  const loading = useMemo(
    () => authLoading || companyListLoading,
    [authLoading, companyListLoading],
  );

  useMount(() => {
    tg.BackButton.show();
    tg.onEvent('backButtonClicked', onClick);

    const user = {
      id: 460186752,
      first_name: 'Andrey',
      last_name: 'Nebogatikov',
      username: 'allpein',
    };

    const initData =
      'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A460186752%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';
    dispatch(UserAction.setUser(user));
    const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);
    apiService.init(axiosClient);

    if (tokenAlive(token)) {
      dispatch(
        UserAction.initInitialize({
          axiosClient,
          withLoad: true,
          token: token!,
        }),
      );
    } else {
      dispatch(UserAction.initAuth({ axiosClient, initData }));
    }

    return () => {
      tg.offEvent('backButtonClicked', onClick);
    };
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
