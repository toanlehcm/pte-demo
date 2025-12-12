import { useCallback, useEffect, useState } from 'react';
import type { IDashboardFilter, TAB_KEY } from '../types';
import { useAppDispatch, useAppSelector } from '@/core/redux/store';
import { filterActions } from '../redux/slices/filter-slice';

export const useTabFilters = (tabKey: TAB_KEY) => {
  const dispatch = useAppDispatch();

  // Get filters from Redux store
  const filters = useAppSelector((state) => state.dashboard.filters.filters);
  const isLoading = useAppSelector(
    (state) => state.dashboard.filters.isLoading
  );
  const isSyncing = useAppSelector(
    (state) => state.dashboard.filters.isSyncing
  );

  const [localFilter, setLocalFilter] = useState<IDashboardFilter>(
    filters[tabKey] || {}
  );
  const [isApplied, setIsApplied] = useState(false);

  // Fetch filters when tab changes
  useEffect(() => {
    // Sync from store
    setLocalFilter(filters[tabKey] || {});
  }, [tabKey, filters]);

  // Fetch filters from API on mount
  useEffect(() => {
    // Uncomment when API is ready
    // dispatch(filterActions.fetchFiltersRequest(tabKey));
  }, [tabKey, dispatch]);

  const handleFilterChange = useCallback((newFilter: IDashboardFilter) => {
    setLocalFilter(newFilter);
    setIsApplied(false);
  }, []);

  const handleApply = useCallback(() => {
    dispatch(filterActions.setFilter({ tabKey, filter: localFilter }));
    setIsApplied(true);

    // Sync to server (uncomment when API is ready)
    // dispatch(filterActions.syncFiltersRequest(tabKey));
  }, [dispatch, tabKey, localFilter]);

  const handleClear = useCallback(() => {
    setLocalFilter({});
    dispatch(filterActions.clearFilter(tabKey));
    setIsApplied(false);
  }, [dispatch, tabKey]);

  const handleSave = useCallback(
    (name: string) => {
      dispatch(filterActions.saveFilterRequest({ tabKey, name }));
    },
    [dispatch, tabKey]
  );

  return {
    filter: localFilter,
    appliedFilter: filters[tabKey],
    isApplied,
    isLoading,
    isSyncing,
    handleFilterChange,
    handleApply,
    handleClear,
    handleSave,
  };
};
