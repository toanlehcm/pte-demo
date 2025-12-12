import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { loadState, persistMiddleware } from './persistMiddleware';

/*--------------- Configure Root Store ---------------*/
const sagaMiddleware = createSagaMiddleware();

// Load persisted state
const persistedState = loadState();

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  // preloadedState: persistedState as Partial<RootState> | undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we use saga
      serializableCheck: false, // Disable for saga actions
    }).concat(sagaMiddleware),
  // .concat(persistMiddleware),
});

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;

/*--------------- Create Redux Hooks ---------------*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
