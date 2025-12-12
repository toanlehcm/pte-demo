import React from 'react';
import { Button, DatePicker, Select, Space } from 'antd';
import type { Dayjs } from 'dayjs';
import type { IDashboardFilter } from '../types';

interface IDashboardFiltersProps {
  value: IDashboardFilter;
  onChange: (filter: IDashboardFilter) => void;
  onApply: () => void;
  onClear: () => void;
  onSave?: () => void;
  loading?: boolean;
}

export const DashboardFilters: React.FC<IDashboardFiltersProps> = ({
  value,
  onChange,
  onApply,
  onClear,
  onSave,
  loading = false,
}) => {
  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    const updatedFilter = { ...value };

    if (dates) {
      updatedFilter.dateRange = [
        dates[0]?.format('YYYY-MM-DD') || '',
        dates[1]?.format('YYYY-MM-DD') || '',
      ];
    } else {
      delete updatedFilter.dateRange;
    }

    onChange(updatedFilter);
  };

  return (
    <div className='flex items-center gap-4 rounded-lg bg-white'>
      <Space size='middle' wrap>
        {/* Date Range */}
        <DatePicker.RangePicker
          placeholder={['Start Date', 'End Date']}
          onChange={handleDateChange}
          className='w-64'
        />

        {/* Location */}
        <Select
          placeholder='Location'
          value={value.location ?? null}
          onChange={(location) => onChange({ ...value, location })}
          className='w-40'
          allowClear
          options={[
            { label: 'Location 1', value: 'loc1' },
            { label: 'Location 2', value: 'loc2' },
          ]}
        />

        {/* Provider */}
        <Select
          placeholder='Provider'
          value={value.provider ?? null}
          onChange={(provider) => onChange({ ...value, provider })}
          className='w-40'
          allowClear
          options={[
            { label: 'Provider 1', value: 'prov1' },
            { label: 'Provider 2', value: 'prov2' },
          ]}
        />

        {/* Service */}
        <Select
          placeholder='Service'
          value={value.service ?? null}
          onChange={(service) => onChange({ ...value, service })}
          className='w-40'
          allowClear
          options={[
            { label: 'Service 1', value: 'serv1' },
            { label: 'Service 2', value: 'serv2' },
          ]}
        />

        {/* Actions */}
        <Button type='primary' onClick={onApply} loading={loading}>
          Apply Filter
        </Button>

        <Button onClick={onClear}>Clear Filters</Button>

        {onSave && (
          <Button type='dashed' onClick={onSave}>
            Save Filters
          </Button>
        )}
      </Space>
    </div>
  );
};
