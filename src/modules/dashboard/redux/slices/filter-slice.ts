import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  TAB_KEY,
  type IDashboardFilter,
  type ISavedFilter,
  type TabFilterState,
} from '../../types';

export interface IFilterState {
  // Current filters for each tab
  filters: TabFilterState;

  // Saved filters
  savedFilters: ISavedFilter[];

  // Loading states
  isLoading: boolean;
  isSyncing: boolean;

  // Error
  error: string | null;
}

const initialState: IFilterState = {
  filters: {
    [TAB_KEY.PRACTICE]: {},
    [TAB_KEY.FRONTEND]: {},
    [TAB_KEY.BACKEND]: {},
  },
  savedFilters: [],
  isLoading: false,
  isSyncing: false,
  error: null,
};

const filterSlice = createSlice({
  name: 'dashboardFilters',
  initialState,
  reducers: {
    // Set filter for a tab
    setFilter: (
      state,
      action: PayloadAction<{ tabKey: TAB_KEY; filter: IDashboardFilter }>
    ) => {
      state.filters[action.payload.tabKey] = action.payload.filter;
    },

    // Clear filter for a tab
    clearFilter: (state, action: PayloadAction<TAB_KEY>) => {
      state.filters[action.payload] = {};
    },

    // Clear all filters
    clearAllFilters: (state) => {
      state.filters = {
        [TAB_KEY.PRACTICE]: {},
        [TAB_KEY.FRONTEND]: {},
        [TAB_KEY.BACKEND]: {},
      };
    },

    // Save filter
    saveFilterRequest: (
      state,
      action: PayloadAction<{ tabKey: TAB_KEY; name: string }>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    saveFilterSuccess: (state, action: PayloadAction<ISavedFilter>) => {
      state.savedFilters.push(action.payload);
      state.isLoading = false;
    },
    saveFilterFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Load saved filter
    loadSavedFilter: (state, action: PayloadAction<string>) => {
      const savedFilter = state.savedFilters.find(
        (f) => f.id === action.payload
      );
      if (savedFilter) {
        state.filters[savedFilter.tabKey as TAB_KEY] = savedFilter.filters;
      }
    },

    // Delete saved filter
    deleteSavedFilterRequest: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSavedFilterSuccess: (state, action: PayloadAction<string>) => {
      state.savedFilters = state.savedFilters.filter(
        (f) => f.id !== action.payload
      );
      state.isLoading = false;
    },
    deleteSavedFilterFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Fetch filters from API
    fetchFiltersRequest: (state, action: PayloadAction<TAB_KEY>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFiltersSuccess: (
      state,
      action: PayloadAction<{ tabKey: TAB_KEY; filters: IDashboardFilter }>
    ) => {
      state.filters[action.payload.tabKey] = action.payload.filters;
      state.isLoading = false;
    },
    fetchFiltersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Sync filters to server
    syncFiltersRequest: (state, action: PayloadAction<TAB_KEY>) => {
      state.isSyncing = true;
      state.error = null;
    },
    syncFiltersSuccess: (state) => {
      state.isSyncing = false;
    },
    syncFiltersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSyncing = false;
    },

    // Fetch all saved filters
    fetchSavedFiltersRequest: (
      state,
      action: PayloadAction<TAB_KEY | undefined>
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSavedFiltersSuccess: (
      state,
      action: PayloadAction<ISavedFilter[]>
    ) => {
      state.savedFilters = action.payload;
      state.isLoading = false;
    },
    fetchSavedFiltersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const filterActions = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
