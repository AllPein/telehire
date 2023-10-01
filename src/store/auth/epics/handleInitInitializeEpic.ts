import { Epic } from 'redux-observable';
import { finalize, ignoreElements, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { LOGGED_IN_AS } from '@/constants/localStorage';
import { ofAction } from '@/operators/ofAction';
import { AxiosClient } from '@/services/AxiosClient';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { token } from '@/utils/token';

export const handleInitInitialize: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(UserAction.initInitialize),
    tap(({ payload: withLoad }) => {
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

      const axiosClient = new AxiosClient(import.meta.env.VITE_BASE_API_URL);
      apiService.init(axiosClient);
      axiosClient.init({ Authorization: 'Bearer ' + token!.token });
      dispatch(UserAction.setToken(token!));
      dispatch(ResumeAction.getMyResumes());
      dispatch(UserAction.initCompanyList());

      dispatch(UserAction.initLogin(loggedInAs));
    }),
    finalize(() => {
      dispatch(
        LoaderAction.setLoading({
          type: 'auth',
          value: false,
        }),
      );
    }),
    ignoreElements(),
  );
