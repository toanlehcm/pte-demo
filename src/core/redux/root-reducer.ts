import { combineReducers } from '@reduxjs/toolkit';
import { dashboardReducers } from '@/modules/dashboard/redux/dashboard-reducer';

export const rootReducer = combineReducers({
  dashboard: dashboardReducers,
});
