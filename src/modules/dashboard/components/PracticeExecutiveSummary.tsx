import React from 'react';
import { DashboardFilters } from './DashboardFilters';
import { useTabFilters } from '../hooks';
import { TAB_KEY } from '../types';
import { Typography } from 'antd';
import { MetricCard, StatisticCard } from '@/core/components';

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
    <div className='flex flex-col gap-4'>
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
      <div className='rounded-lg bg-white px-3 py-4'>
        <Typography.Title level={5}>Appointment Fill Rate</Typography.Title>
        {/* Your metrics, charts here */}
        {/* <p>Applied filters: {JSON.stringify(appliedFilter, null, 2)}</p> */}

        <div className='h-[136px] flex gap-2 '>
          <StatisticCard
            value={75.0}
            suffix='%'
            precision={2}
            title='of appointments available booked'
            className='flex-1 flex-col-reverse test items-center justify-center gap-1'
          />

          <div className='flex flex-col flex-1 gap-2'>
            <StatisticCard
              value={150}
              title='appointments missed'
              className='flex-1 flex-row-reverse items-center justify-center gap-2'
            />

            <StatisticCard
              value={400}
              title='double-booked appointments'
              className='flex-1 flex-row-reverse items-center justify-center gap-2'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
