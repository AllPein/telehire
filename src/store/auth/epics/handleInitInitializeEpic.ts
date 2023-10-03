import { Epic } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { LOGGED_IN_AS } from '@/constants/localStorage';
import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/resume/ResumeActions';

export const handleInitInitialize: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initInitialize),
    tap(({ payload: { withLoad, axiosClient, token } }) => {
      if (withLoad) {
        dispatch(
          LoaderAction.setLoading({
            type: 'auth',
            value: true,
          }),
        );
      }

      const loggedInAs = localStorage.getItem(LOGGED_IN_AS) as
        | 'company'
        | 'applicant';

      axiosClient.init({ Authorization: 'Bearer ' + token.token });
      dispatch(UserAction.setToken(token!));
      dispatch(ResumeAction.getMyResumes());
      dispatch(UserAction.initCompanyList());

      dispatch(UserAction.initLogin(loggedInAs));
      dispatch(
        LoaderAction.setLoading({
          type: 'auth',
          value: false,
        }),
      );
    }),

    ignoreElements(),
  );
