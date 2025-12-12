import { all, fork } from 'redux-saga/effects';
import { filterSaga } from './sagas/filter-saga';

export function* dashboardSagas(): Generator {
  yield all([fork(filterSaga)]);
}
