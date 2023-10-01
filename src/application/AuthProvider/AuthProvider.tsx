import { Spinner } from '@/components/Spinner/Spinner';
import { useMount } from '@/hooks/useMount';
import { useTelegram } from '@/hooks/useTelegram';
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
    dispatch(UserAction.setUser(user));

    if (tokenAlive(token)) {
      dispatch(UserAction.initInitialize(true));
    } else {
      dispatch(
        UserAction.initAuth({
          id: user.id,
        }),
      );
    }

    return () => {
      tg.offEvent('backButtonClicked', onClick);
    };
  });

  return <>{loading ? <Spinner /> : children}</>;
};

export { AuthProvider };
