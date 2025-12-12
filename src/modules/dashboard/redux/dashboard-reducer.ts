import { combineReducers } from '@reduxjs/toolkit';
import { filterReducer } from './slices/filter-slice';

export const dashboardReducers = combineReducers({
  filters: filterReducer,
});

export type DashboardState = ReturnType<typeof dashboardReducers>;
