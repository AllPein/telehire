import { Epic } from 'redux-observable';
import { from } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';
import { AnyAction } from 'typescript-fsa';

import { CURRENT_COMPANY_ID } from '@/constants/localStorage';
import { ofAction } from '@/operators/ofAction';
import { RootState, StoreDependencies } from '@/store/StoreTypes';
import { UserAction } from '@/store/auth/UserActions';
import { history } from '@/utils/history';
import { mapCompanyFormDataToVacancyDto } from '@/utils/mappers';
import { CompanyAction } from '../CompanyActions';

export const handleCreateCompany: Epic<
  AnyAction,
  AnyAction,
  RootState,
  StoreDependencies
> = (action$, state$, { apiService, dispatch }) =>
  action$.pipe(
    ofAction(CompanyAction.createCompany),
    switchMap(({ payload: company }) => {
      const mappedCompany = mapCompanyFormDataToVacancyDto(company);
      return from(apiService.createCompany(mappedCompany)).pipe(
        tap((newCompany) => {
          dispatch(UserAction.initCompanyList());

          localStorage.setItem(CURRENT_COMPANY_ID, newCompany.id.toString());
          dispatch(UserAction.initLogin('company'));
          history.push('/profile');
        }),
      );
    }),
    ignoreElements(),
  );
