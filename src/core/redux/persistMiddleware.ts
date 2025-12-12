import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './index';
// import type { RootState } from './index';

const PERSIST_KEY = 'dashboard-filters';

// Define the structure of persisted state
interface PersistedState {
  dashboardFilters?: any;
}

// Load state from localStorage
export const loadState = (): PersistedState | undefined => {
  try {
    const serializedState = localStorage.getItem(PERSIST_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({
      dashboardFilters: state.dashboard.filters,
    });
    localStorage.setItem(PERSIST_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

// Persist middleware
export const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save to localStorage after every action
  saveState(store.getState());

  return result;
};
