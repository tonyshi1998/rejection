/* eslint-disable import/no-import-module-exports */
import { configureStore } from "@reduxjs/toolkit";
import {
  createMigrate,
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
//import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./root-reducer";
import Migrations from "./migrations";
//import rootSaga, { cancelSagas } from "store/root-saga";
//export const sagaMiddleware = createSagaMiddleware();
let store: ReturnType<typeof makeStore>;
let persistor: ReturnType<typeof persistStore>;
const debug = false;
const createPersistedReducer = () =>
  persistReducer(
    {
      key: "root",
      storage,
      version: 0,
      migrate: createMigrate(Migrations, { debug }), // optimize it
    },
    rootReducer
  );
export type RootState = NonNullable<
  Parameters<ReturnType<typeof createPersistedReducer>>[0]
>;
export const makeStore = () => {
  const newStore = configureStore({
    reducer: createPersistedReducer(),
    middleware: (middleware) => [
      ...middleware({
        //thunk: false,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredActionPaths: ["resolve", "reject"],
        },
      }),
      //sagaMiddleware,
    ],
  });
  // optimizes hotreload on next.js with sagas
  //   if (module.hot) {
  //     module.hot.accept("./root-reducer", () => {
  //       newStore.replaceReducer(createPersistedReducer());
  //     });
  // module.hot.accept("store/root-saga", () => {
  //   // Cancel the sagas before running the new versions
  //   newStore.dispatch(cancelSagas());
  //   sagaMiddleware.run(rootSaga);
  // });
  //   }
  //sagaMiddleware.run(rootSaga);
  // @ts-ignore
  newStore.__persistor = persistStore(newStore, null, () => {});
  return newStore;
};
export const wrapper = createWrapper(makeStore);
export const getStore = () => store;
export const setStore = (newStore: typeof store) => {
  store = newStore;
};
// @ts-ignore
export const getPersistor = () => getStore().__persistor as typeof persistor;
// aux functions to get the types correctly
const getStoreDispatch = () => makeStore().dispatch;
export type AppDispatch = ReturnType<typeof getStoreDispatch>;
