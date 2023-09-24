import { routerMiddleware } from 'connected-react-router';
import {
  applyMiddleware,
  CombinedState,
  compose,
  createStore,
  Dispatch,
  Reducer,
  Store,
} from 'redux';
import * as logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import actionCreatorFactory, { AnyAction } from 'typescript-fsa';

import rootEpic from '@/store/RootEpic';
import { history } from '@/utils/history';

import appReducer from './Reducers';
import { RootState, StoreDependencies } from './StoreTypes';

const factory = actionCreatorFactory('root');

export const RootStoreAction = {
  resetStore: factory<RootState>('RESET_STORE'),
};

const configureStore = (): Store<CombinedState<RootState>, AnyAction> => {
  const epicMiddleware = createEpicMiddleware<
    AnyAction,
    AnyAction,
    void,
    StoreDependencies
  >({
    dependencies: {
      history,

      get dispatch(): Dispatch<AnyAction> {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return store.dispatch;
      },
    },
  });
  const middleware =
    process.env.NODE_ENV === 'development'
      ? [logger.createLogger(), routerMiddleware(history), epicMiddleware]
      : [routerMiddleware(history), epicMiddleware];

  const rootReducer = (
    state: CombinedState<RootState>,
    action: AnyAction,
  ): any => appReducer(state, action);

  const composeEnhancers =
    typeof window === 'object' &&
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? // eslint-disable-next-line no-underscore-dangle
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
        })
      : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  );

  const store = createStore(
    rootReducer as Reducer<CombinedState<RootState>, AnyAction>,
    process.env.NODE_ENV === 'development'
      ? enhancer
      : applyMiddleware(...middleware),
  );

  epicMiddleware.run(rootEpic);

  return store;
};

const store = configureStore();

export const initialStoreState = store.getState();

export default store;
