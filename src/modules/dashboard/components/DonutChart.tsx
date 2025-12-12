import React, { useState } from 'react';
import { Pie } from '@ant-design/charts';
import type { PieConfig } from '@ant-design/charts';

interface IDonutChartData {
  type: string;
  value: number;
}

interface IDonutChartProps {
  data: IDonutChartData[];
  centerText?: {
    value: string | number;
    label?: string;
  };
  height?: number;
  showLegend?: boolean;
  onSliceClick?: (data: IDonutChartData) => void;
}

export const DonutChart: React.FC<IDonutChartProps> = ({
  data,
  centerText,
  height = 300,
  showLegend = true,
  onSliceClick,
}) => {
  const [activeType, setActiveType] = useState<string | null>(null);

  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.7,

    // Custom colors
    color: ({ type }: IDonutChartData) => {
      const colorMap: Record<string, string> = {
        Finished: '#52C41A',
        Booked: '#1890FF',
        Cancelled: '#FF4D4F',
        'No Show': '#FAAD14',
        Rescheduled: '#722ED1',
      };
      return colorMap[type] || '#d9d9d9';
    },

    // Disable default labels
    label: false,

    // Legend
    legend: showLegend
      ? {
          position: 'bottom',
          layout: 'horizontal',
          itemName: {
            style: {
              fontSize: 14,
              fill: '#595959',
            },
          },
          marker: {
            symbol: 'square',
            style: {
              r: 6,
            },
          },
        }
      : false,

    // Center text
    statistic: centerText
      ? {
          title: {
            offsetY: -8,
            content: centerText.label || '',
            style: {
              fontSize: '14px',
              color: '#8C8C8C',
              fontWeight: 400,
            },
          },
          content: {
            offsetY: 4,
            content: centerText.value.toString(),
            style: {
              fontSize: '32px',
              fontWeight: 600,
              color: '#262626',
            },
          },
        }
      : undefined,

    // Tooltip
    tooltip: {
      formatter: (datum: IDonutChartData) => {
        return {
          name: datum.type,
          value: `${datum.value} appointments`,
        };
      },
    },

    // Interactions
    interactions: [
      {
        type: 'element-active',
      },
    ],

    // Animation
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 1000,
      },
    },

    // State styles
    state: {
      active: {
        style: {
          lineWidth: 2,
          stroke: '#000',
        },
      },
    },

    // Click event
    onReady: (plot) => {
      plot.on('element:click', (evt: any) => {
        const { data } = evt.data;
        setActiveType(data.type);
        onSliceClick?.(data);
      });
    },
  };

  return (
    <div className='relative'>
      <Pie {...config} height={height} />

      {activeType && (
        <div className='mt-2 text-center text-sm text-gray-500'>
          Selected: {activeType}
        </div>
      )}
    </div>
  );
};
