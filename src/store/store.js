import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducers";
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from "./sagas/rootWatcherSaga"

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "main-key",
  storage,
  whitelist: ["token", "userDetails"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export const persistor = persistStore(store);

export default store;
