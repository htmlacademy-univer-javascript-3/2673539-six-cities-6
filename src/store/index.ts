import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import cityReducer from './reducers/city-slice';
import offersReducer from './reducers/offers-slice';
import userReducer from './reducers/user-slice';
import detailedOfferReducer from './reducers/detailed-offer-slice';
import commentsReducer from './reducers/comments-slice';

export const api = createAPI();

const persistConfig = {
  key: 'six-cities',
  storage,
  whitelist: ['userState', 'cityState'],
};

const rootReducer = combineReducers({
  cityState: cityReducer,
  offersState: offersReducer,
  userState: userReducer,
  detailedOfferState: detailedOfferReducer,
  commentsState: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof storeDispatchPlaceholder;

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppStore = typeof store;
export type AppThunkDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export { store };
export const storeDispatchPlaceholder = store.dispatch;
