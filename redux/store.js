import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import rootSaga from './saga';

export const configureAppStore = (preloadedState) => {
  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== 'undefined';

  let store;

	if (isClient) {
    const {
      persistReducer,
      FLUSH,
      REHYDRATE,
      PAUSE,
      PERSIST,
      PURGE,
      REGISTER,
    } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'root',
      version: 1,
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(sagaMiddleware),
      preloadedState,
    });
  } else {
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
      preloadedState,
    });
  }

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(configureAppStore, { debug: false });
