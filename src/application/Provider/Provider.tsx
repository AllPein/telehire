import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import store from '@/store/InitStore';
import { history } from '@/utils/history';

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => (
  <StoreProvider store={store}>
    <ConnectedRouter history={history}>{children}</ConnectedRouter>
  </StoreProvider>
);

export { Provider };
