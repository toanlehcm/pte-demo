import React from 'react';
import { DashboardFilters } from './DashboardFilters';
import { useTabFilters } from '../hooks';
import { TAB_KEY } from '../types';

export const FrontEndAnalytics: React.FC = () => {
  const {
    filter,
    appliedFilter,
    handleFilterChange,
    handleApply,
    handleClear,
  } = useTabFilters(TAB_KEY.FRONTEND);

  return (
    <div className='flex flex-col gap-6'>
      {/* Filters */}
      <DashboardFilters
        value={filter}
        onChange={handleFilterChange}
        onApply={handleApply}
        onClear={handleClear}
      />

      {/* Content */}
      <div className='rounded-lg bg-white p-6'>
        <h3 className='mb-4 text-lg font-semibold'>Front-End Analytics</h3>
        <p>Applied filters: {JSON.stringify(appliedFilter, null, 2)}</p>
      </div>
    </div>
  );
};
