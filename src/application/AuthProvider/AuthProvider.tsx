import { Spinner } from '@/components/Spinner/Spinner';
import { TOKEN_NAME } from '@/constants/localStorage';
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
  useBackButton({
    onClick: () => history.goBack(),
  });

  const loading = useMemo(
    () => authLoading || companyListLoading,
    [authLoading, companyListLoading],
  );

  useMount(() => {
    localStorage.removeItem(TOKEN_NAME);

    if (tg.initDataUnsafe.start_param.includes('company')) {
      const hash = tg.initDataUnsafe.start_param.split('company')[1];
      history.push('/accept-invite/' + hash);
    }

    //const initData =
    //  'user=%7B%22id%22%3A460186752%2C%22first_name%22%3A%22Aleksandr%22%2C%22last_name%22%3A%22Panin%22%2C%22username%22%3A%22allpein%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5018211901422947381&chat_type=private&auth_date=1696696218&hash=4657beb2acf0adcc10e3ae5b1f38c3846ef2114412241035e180ef205ea6ba74';
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
      dispatch(
        UserAction.initAuth({
          axiosClient,
          initData: tg.initData,
        }),
      );
    }
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
