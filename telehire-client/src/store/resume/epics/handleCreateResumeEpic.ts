
import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { finalize, ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { ofAction } from '@/operators/ofAction';
import { LoaderAction } from '@/store/Loader/LoaderActions';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { ResumeAction } from '@/store/resume/ResumeActions';
import { history } from '@/utils/history';
import { mapResumeFormToVacancyDto } from '@/utils/mappers';

export const handleCreateResume: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(ResumeAction.createResume),
    tap(() => {
      dispatch(LoaderAction.setLoading({ type: 'createResume', value: true }));
    }),
    switchMap(({ payload: formData }) => {
      const resume = mapResumeFormToVacancyDto(formData);
      return from(apiService.createResume(resume)).pipe(
        tap(() => {
          dispatch(ResumeAction.getMyResumes());
          dispatch(UserAction.getUser());
          history.push('/profile');
        }),
        finalize(() => {
          dispatch(
            LoaderAction.setLoading({ type: 'createResume', value: false }),
          );
        }),
      );
    }),

    ignoreElements(),
  );
