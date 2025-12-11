import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { cn } from '@/core/lib/utils';
import { TREND_STATISTIC } from '../constant';

/**
    Row đầu tiên (4 cards):
    Appointment Fill Rate

    Value: 75.00%
    Subtitle: X appointments of Y appointments available booked
    Gross Charge (trong Revenue card)

    Value: $3,500.00
    Trend: +$200 from previous 28 days
    Post-Deductions (trong Revenue card)

    Value: $2,700.00
    Trend: +$200 from previous 28 days
    Total Collection

    Value: $3,500.00
    Trend: +$200 from previous 28 days
    Applied Payments

    Value: $2,700.00
    Trend: +$800 from previous 28 days
    Account Receivables section:
    Total A/R

    Value: $3,500.00
    Label: Total A/R
    $500.00

    Label: insurance AR
    DSO

    Value: 123 days
*/

interface IStatisticCardProps {
  title?: string;
  value: number | string;
  prefix?: string | undefined;
  suffix?: string | undefined;
  precision?: number | undefined;
  trend?:
    | {
        value: number | string;
        type: TREND_STATISTIC;
        period?: string;
      }
    | undefined;
  subtitle?: string | undefined;
  valueClassName?: string | undefined;
  className?: string | undefined;
}

export const StatisticCard: React.FC<IStatisticCardProps> = ({
  title = '',
  value,
  prefix = '',
  suffix = '',
  precision,
  trend,
  subtitle,
  valueClassName,
  className = '',
}) => {
  // Format value nếu là number
  const formattedValue =
    typeof value === 'number' && precision !== undefined
      ? value.toFixed(precision)
      : value;

  // Render trend
  const renderTrend = () => {
    if (!trend) return null;

    const isIncrease = trend.type === TREND_STATISTIC.INCREASE;
    const trendColorClass = isIncrease ? 'text-green-500' : 'text-red-500';
    const TrendIcon = isIncrease ? ArrowUpOutlined : ArrowDownOutlined;

    return (
      <div
        className={`mt-2 flex items-center gap-1 text-sm ${trendColorClass}`}
      >
        <TrendIcon style={{ fontSize: 12 }} />
        <span>
          {prefix}
          {trend.value}
          {suffix}
          {trend.period && ` ${trend.period}`}
        </span>
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Title */}
      <div className='mb-2 text-sm text-gray-500'>{title}</div>

      {/* Value */}
      <div
        className={cn(
          'text-3xl font-semibold leading-tight text-gray-900',
          valueClassName
        )}
      >
        {prefix}
        {formattedValue}
        {suffix}
      </div>

      {/* Subtitle */}
      {subtitle && <div className='mt-2 text-xs text-gray-500'>{subtitle}</div>}

      {/* Trend */}
      {renderTrend()}
    </div>
  );
};
