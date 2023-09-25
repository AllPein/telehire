import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import { AuthProvider } from '@/application/AuthProvider/AuthProvider';
import store from '@/store/InitStore';
import { history } from '@/utils/history';

type Props = {
  children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <ConnectedRouter history={history}>
        <AuthProvider>{children}</AuthProvider>
      </ConnectedRouter>
    </StoreProvider>
  );
};

export { Provider };
