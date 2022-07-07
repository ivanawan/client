import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/slice/User'
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import Cart from './slice/Cart';

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
user:userReducer,
cart:Cart
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  })
});

export const persistor = persistStore(store);