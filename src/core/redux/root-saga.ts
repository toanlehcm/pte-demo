import { all } from 'redux-saga/effects';
import { dashboardSagas } from '@/modules/dashboard/redux/dashboard-saga';

export function* rootSaga() {
  yield all([dashboardSagas()]);
}
