import React from 'react';
import { DashboardFilters } from './DashboardFilters';
import { useTabFilters } from '../hooks';
import { TAB_KEY } from '../types';

export const PracticeExecutiveSummary: React.FC = () => {
  const {
    filter,
    appliedFilter,
    isApplied,
    handleFilterChange,
    handleApply,
    handleClear,
  } = useTabFilters(TAB_KEY.PRACTICE);

  return (
    <div className='flex flex-col gap-6'>
      {/* Filters */}
      <DashboardFilters
        value={filter}
        onChange={handleFilterChange}
        onApply={handleApply}
        onClear={handleClear}
      />

      {/* Debug info */}
      {isApplied && (
        <div className='rounded bg-green-50 p-4'>
          <p className='text-sm text-green-600'>
            Filters applied: {JSON.stringify(appliedFilter)}
          </p>
        </div>
      )}

      {/* Content */}
      <div className='rounded-lg bg-white p-6'>
        <h3 className='mb-4 text-lg font-semibold'>
          Practice Executive Summary
        </h3>
        {/* Your metrics, charts here */}
        <p>Applied filters: {JSON.stringify(appliedFilter, null, 2)}</p>
      </div>
    </div>
  );
};
