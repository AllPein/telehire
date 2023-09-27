import {
  IApiService,
  ICompanyService,
  ISupabaseService,
} from '@/services/types';
import { AuthStore } from '@/store/auth/AuthActions';
import { RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';
import { CompanyStore } from './company/CompanyActions';

export interface RootState {
  auth: AuthStore;
  company: CompanyStore;
  router: RouterState;
}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
  supabaseService: ISupabaseService;
  companyService: ICompanyService;
  apiService: IApiService;
};

export type Wallet = {
  classicAdress: string;
  privateKey: string;
  publicKey: string;
  seed: string;
  adress: string;
};

export type XummWallet = {
  sub: string;
  picture: string;
  account: string;
  name?: string;
  domain?: string;
  blocked: boolean;
  source: string;
  kycApproved: boolean;
  proSubscription: boolean;
};

export type AccountInfo = {
  token: string;
  address: string;
  imageUrl: string;
  name: string;
  bio?: string;
};
