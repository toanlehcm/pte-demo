import React from 'react';
import { Card } from 'antd';
import type { CardProps } from 'antd';
import { StatisticCard } from './StatisticCard';
import type { TREND_STATISTIC } from '../constant';
import { cn } from '@/core/lib/utils';

interface IMetricCardProps extends Omit<CardProps, 'title'> {
  // StatisticCard props
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  precision?: number;
  trend?: {
    value: number | string;
    type: TREND_STATISTIC;
    period?: string;
  };
  subtitle?: string;
  valueClassName?: string;

  // Card props
  loading?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  size?: 'default' | 'small';
}

export const MetricCard: React.FC<IMetricCardProps> = ({
  // StatisticCard props
  title = '',
  value,
  prefix,
  suffix,
  precision,
  trend,
  subtitle,
  valueClassName,

  // Card props
  loading = false,
  bordered = true,
  hoverable = false,
  size = 'default',
  className,
  ...restCardProps
}) => {
  return (
    <Card
      loading={loading}
      bordered={bordered}
      hoverable={hoverable}
      size={size}
      className={cn('h-full', className)}
      {...restCardProps}
    >
      <StatisticCard
        title={title}
        value={value}
        prefix={prefix}
        suffix={suffix}
        precision={precision}
        trend={trend}
        subtitle={subtitle}
        valueClassName={valueClassName}
      />
    </Card>
  );
};
