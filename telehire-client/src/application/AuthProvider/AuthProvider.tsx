import { Spinner } from '@/components/Spinner/Spinner';
import { APP_STARTED_FROM_COMMAND } from '@/constants/localStorage';
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
    if (
      tg.initDataUnsafe.start_param?.includes('company') &&
      !Boolean(localStorage.getItem(APP_STARTED_FROM_COMMAND))
    ) {
      const hash = tg.initDataUnsafe.start_param.split('company')[1];
      history.push('/accept-invite/' + hash);
    }

    const initData =
      'query_id=AAG-2KAaAAAAAL7YoBqjyMsc&user=%7B%22id%22%3A446748862%2C%22first_name%22%3A%22%D0%90%D0%BD%D0%B4%D1%80%D0%B5%D0%B9%22%2C%22last_name%22%3A%22%D0%9D%D0%B5%D0%B1%D0%BE%D0%B3%D0%B0%D1%82%D0%B8%D0%BA%D0%BE%D0%B2%22%2C%22username%22%3A%22andronax%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1696876838&hash=ad24bfdb464f07b7f717abc9e43c55a423199e924f9d9787844cfd2690a6e23c';
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
          initData: initData,
        }),
      );
    }
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
