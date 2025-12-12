import type { IDashboardFilter, ISavedFilter, TAB_KEY } from '../types';

export const filterService = {
  // Get filters for a tab
  async getFilters(tabKey: TAB_KEY): Promise<IDashboardFilter> {
    const response = await fetch(`/api/dashboard/filters/${tabKey}`);
    return response.json();
  },

  // Save current filters
  async saveFilters(tabKey: TAB_KEY, filters: IDashboardFilter): Promise<void> {
    await fetch(`/api/dashboard/filters/${tabKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    });
  },

  // Get saved filters
  async getSavedFilters(tabKey?: TAB_KEY): Promise<ISavedFilter[]> {
    const url = tabKey
      ? `/api/dashboard/saved-filters?tab=${tabKey}`
      : '/api/dashboard/saved-filters';
    const response = await fetch(url);
    return response.json();
  },

  // Create saved filter
  async createSavedFilter(
    data: Omit<ISavedFilter, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ISavedFilter> {
    const response = await fetch('/api/dashboard/saved-filters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Delete saved filter
  async deleteSavedFilter(filterId: string): Promise<void> {
    await fetch(`/api/dashboard/saved-filters/${filterId}`, {
      method: 'DELETE',
    });
  },
};
