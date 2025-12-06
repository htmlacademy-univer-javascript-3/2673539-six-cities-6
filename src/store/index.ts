import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducers/reducer';
import { createAPI } from '../services/api';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

export const api = createAPI();

const persistConfig = {
  key: 'six-cities',
  storage,
  whitelist: [
    'authorizationStatus',
    'userData',
    'favoriteOffers',
    'city'
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
