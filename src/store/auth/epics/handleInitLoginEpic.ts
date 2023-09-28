import { Epic } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { history } from '@/utils/history';

export const handleInitLogin: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initLogin),
    tap(({ payload: loggedInAs }) => {
      if (!loggedInAs) {
        history.push('/');
      }
    }),
    tap(({ payload: loggedInAs }) => {
      localStorage.setItem('user_logged_in_as', loggedInAs!);
      dispatch(UserAction.setUser({ loggedInAs }));
    }),
    ignoreElements(),
  );
