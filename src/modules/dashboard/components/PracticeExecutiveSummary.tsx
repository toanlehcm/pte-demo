import React from 'react';
import { Typography } from 'antd';
import { DashboardFilters } from './DashboardFilters';
import { DonutChart } from './DonutChart';
import { useTabFilters } from '../hooks';
import { TAB_KEY } from '../types';
import { StatisticCard } from '@/core/components';

export const PracticeExecutiveSummary: React.FC = () => {
  const {
    filter,
    appliedFilter,
    isApplied,
    handleFilterChange,
    handleApply,
    handleClear,
  } = useTabFilters(TAB_KEY.PRACTICE);

  // Donut chart data
  const appointmentData = [
    { type: 'Finished', value: 10 },
    { type: 'Booked', value: 8 },
    { type: 'Cancelled', value: 3 },
    { type: 'No Show', value: 2 },
    { type: 'Rescheduled', value: 1 },
  ];

  const totalAppointments = appointmentData.reduce(
    (sum, item) => sum + item.value,
    0
  );

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

        {/* Statistics Cards */}
        <div className='flex gap-2'>
          <StatisticCard
            value={75.0}
            suffix='%'
            precision={2}
            title='of appointments available booked'
            className='flex-1 flex-col-reverse items-center justify-center gap-1'
          />

          <div className='flex flex-1 flex-col gap-2'>
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

        {/* Donut Chart */}
        <div className='mt-6'>
          <DonutChart
            data={appointmentData}
            centerText={{
              value: totalAppointments,
              label: 'Appointments',
            }}
            height={300}
            showLegend
          />
        </div>
      </div>
    </div>
  );
};
