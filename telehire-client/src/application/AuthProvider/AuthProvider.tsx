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
