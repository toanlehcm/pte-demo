export enum TAB_KEY {
  PRACTICE = 'PRACTICE',
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}

export interface IDashboardFilter {
  dateRange?: [string, string];
  location?: string;
  provider?: string;
  service?: string;
}

export interface ISavedFilter {
  id: string;
  name: string;
  tabKey: string;
  filters: IDashboardFilter;
  createdAt: string;
  updatedAt: string;
}

export type TabFilterState = Record<TAB_KEY, IDashboardFilter>;
