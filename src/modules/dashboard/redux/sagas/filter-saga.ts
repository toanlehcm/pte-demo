import { call, put, select, takeLatest } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { filterActions } from '../slices/filter-slice';
import { filterService } from '../../services/dashboard.service';
import type { IDashboardFilter, ISavedFilter, TAB_KEY } from '../../types';
import type { RootState } from '@/core/redux';

// Selector to get current filter
const getCurrentFilter = (state: RootState, tabKey: TAB_KEY) =>
  state.dashboard.filters.filters[tabKey];

// Save filter saga
function* saveFilterSaga(
  action: PayloadAction<{ tabKey: TAB_KEY; name: string }>
) {
  try {
    const { tabKey, name } = action.payload;

    // Get current filter from state
    const currentFilter: IDashboardFilter = yield select(
      getCurrentFilter,
      tabKey
    );

    // Create saved filter object
    const savedFilterData: Omit<
      ISavedFilter,
      'id' | 'createdAt' | 'updatedAt'
    > = {
      name,
      tabKey,
      filters: currentFilter,
    };

    // Call API
    const savedFilter: ISavedFilter = yield call(
      filterService.createSavedFilter,
      savedFilterData
    );

    // Dispatch success
    yield put(filterActions.saveFilterSuccess(savedFilter));
  } catch (error) {
    yield put(filterActions.saveFilterFailure((error as Error).message));
  }
}

// Delete saved filter saga
function* deleteSavedFilterSaga(action: PayloadAction<string>) {
  try {
    const filterId = action.payload;

    // Call API
    yield call(filterService.deleteSavedFilter, filterId);

    // Dispatch success
    yield put(filterActions.deleteSavedFilterSuccess(filterId));
  } catch (error) {
    yield put(filterActions.deleteSavedFilterFailure((error as Error).message));
  }
}

// Fetch filters saga
function* fetchFiltersSaga(action: PayloadAction<TAB_KEY>) {
  try {
    const tabKey = action.payload;

    // Call API
    const filters: IDashboardFilter = yield call(
      filterService.getFilters,
      tabKey
    );

    // Dispatch success
    yield put(filterActions.fetchFiltersSuccess({ tabKey, filters }));
  } catch (error) {
    yield put(filterActions.fetchFiltersFailure((error as Error).message));
  }
}

// Sync filters to server saga
function* syncFiltersSaga(action: PayloadAction<TAB_KEY>) {
  try {
    const tabKey = action.payload;

    // Get current filter from state
    const currentFilter: IDashboardFilter = yield select(
      getCurrentFilter,
      tabKey
    );

    // Call API
    yield call(filterService.saveFilters, tabKey, currentFilter);

    // Dispatch success
    yield put(filterActions.syncFiltersSuccess());
  } catch (error) {
    yield put(filterActions.syncFiltersFailure((error as Error).message));
  }
}

// Fetch saved filters saga
function* fetchSavedFiltersSaga(action: PayloadAction<TAB_KEY | undefined>) {
  try {
    const tabKey = action.payload;

    // Call API
    const savedFilters: ISavedFilter[] = yield call(
      filterService.getSavedFilters,
      tabKey
    );

    // Dispatch success
    yield put(filterActions.fetchSavedFiltersSuccess(savedFilters));
  } catch (error) {
    yield put(filterActions.fetchSavedFiltersFailure((error as Error).message));
  }
}

// Root saga
export function* filterSaga() {
  yield takeLatest(filterActions.saveFilterRequest.type, saveFilterSaga);
  yield takeLatest(
    filterActions.deleteSavedFilterRequest.type,
    deleteSavedFilterSaga
  );
  yield takeLatest(filterActions.fetchFiltersRequest.type, fetchFiltersSaga);
  yield takeLatest(filterActions.syncFiltersRequest.type, syncFiltersSaga);
  yield takeLatest(
    filterActions.fetchSavedFiltersRequest.type,
    fetchSavedFiltersSaga
  );
}
