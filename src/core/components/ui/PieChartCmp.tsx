import React from 'react';
import { Pie, type PieConfig } from '@ant-design/plots';

// const DEFAULT_PIE_CONFIG: Partial<PieConfig> = {
//   angleField: 'value',
//   colorField: 'type',
//   // innerRadius: 0.6,
//   // radius: 1,
//   // label: {
//   //   type: 'inner',
//   //   offset: '-30%',
//   //   style: {
//   //     fontSize: 14,
//   //     textAlign: 'center',
//   //   },
//   // },
//   // legend: {
//   //   position: 'bottom',
//   //   layout: 'horizontal',
//   // },
// };

export const PieChartCmp: React.FC<Partial<PieConfig>> = (props) => {
  return (
    <Pie
      angleField='value'
      colorField='type'
      innerRadius={0.9}
      label={{
        text: 'value',
        style: {
          fontWeight: 'bold',
        },
      }}
      legend={{
        color: {
          title: false,
          position: 'bottom',
          rowPadding: 5,
        },
      }}
      {...props}
    />
  );
};
