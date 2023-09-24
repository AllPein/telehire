import { History } from 'history';
import { AnyAction, Dispatch } from 'redux';

export interface RootState {}

export type StoreDependencies = {
  history: History;
  dispatch: Dispatch<AnyAction>;
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
