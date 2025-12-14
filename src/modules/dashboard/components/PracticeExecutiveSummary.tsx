import React from 'react';
import { Typography } from 'antd';
import { DashboardFilters } from './DashboardFilters';
import { DonutChart } from './DonutChart';
import { useTabFilters } from '../hooks';
import { TAB_KEY } from '../types';
import { CardCmp, PieChartCmp, StatisticCard } from '@/core/components';
import type { PieConfig } from '@ant-design/plots';

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

  const config: Partial<PieConfig> = {
    data: [
      { type: 'Finished', value: 10 },
      { type: 'Booked', value: 8 },
      { type: 'Cancelled', value: 3 },
      { type: 'No Show', value: 2 },
      { type: 'Rescheduled', value: 1 },
    ],
    annotations: [
      {
        type: 'text',
        style: {
          text: '24',
          x: '50%',
          y: '45%',
          textAlign: 'center',
          fontSize: 40,
        },
      },
      {
        type: 'text',
        class: 'text-center font-bold text-sm',
        style: {
          text: 'Appointments',
          x: '50%',
          y: '55%',
          // textAlign: 'center',
          // fontSize: 12,
          // fontWeight: 'bold',
        },
      },
    ],
  };

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
      <CardCmp
        // title={
        //   <Typography.Title
        //   level={5}
        //   className=''
        //   >Appointment Fill Rate</Typography.Title>
        // }
        title='Appointment Fill Rate'
        // styles={{
        //   header: {
        //     padding: '16px 12px', // ← Custom title padding
        //   },
        //   body: {
        //     padding: '24px', // ← Custom body padding
        //   },
        // }}
        classNames={{
          root: 'rounded-lg bg-white px-6 py-4',
          header: 'px-3 py-4',
        }}
      >
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
          {/* <DonutChart
            data={appointmentData}
            centerText={{
              value: totalAppointments,
              label: 'Appointments',
            }}
            height={300}
            showLegend
          /> */}
        </div>

        <div className='w-full'>
          <PieChartCmp {...config} />
        </div>
      </CardCmp>
    </div>
  );
};
