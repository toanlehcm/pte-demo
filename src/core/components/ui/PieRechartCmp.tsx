import React, {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from 'react';
import {
  PieChart,
  Pie,
  Label,
  LabelList,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { Percent } from 'recharts/types/util/types';

interface IPieRechartCmpProps extends ComponentPropsWithoutRef<typeof Pie> {
  width?: Percent | number;
  height?: Percent | number;
  labelProps?: Omit<ComponentProps<typeof Label>, 'content'> & {
    content?: React.ReactNode | ((props: any) => React.ReactElement);
  };
  legendProps?: ComponentProps<typeof Legend>;
  legendContent?: React.ReactNode;
}

export default function PieRechartCmp({
  // Default values
  dataKey = 'value',
  nameKey = 'name',
  outerRadius = '80%',
  innerRadius = '65%',
  cx = '50%',
  cy = '50%',
  isAnimationActive = false,

  // Custom props
  labelProps,
  legendProps,
  legendContent,
  data = [],
  width = '100%',
  height = 400,

  // Rest props from Recharts Pie
  ...restPieProps
}: IPieRechartCmpProps) {
  // Extract content from labelProps
  const { content, ...restLabelProps } = labelProps || {};

  // Render function for Label content
  const renderLabelContent = React.useCallback(
    (props: any) => {
      // If content is already a function, call it directly
      if (typeof content === 'function') {
        return content(props);
      }

      // If content is ReactNode, wrap it in foreignObject
      const { viewBox } = props;
      const { cx = 0, cy = 0 } = viewBox || {};

      return (
        <g>
          <foreignObject x={0} y={0} width='100%' height='100%'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {content}
            </div>
          </foreignObject>
        </g>
      );
    },
    [content]
  );

  return (
    // <PieChart
    //   responsive
    //   style={{
    //     height: 'calc(100% - 20px)',
    //     width: '33%',
    //     flex: '1 1 200px',
    //     aspectRatio: 1,
    //   }}
    // >
    //   <Pie
    //     dataKey={dataKey}
    //     nameKey={nameKey}
    //     outerRadius={outerRadius}
    //     innerRadius={innerRadius}
    //     isAnimationActive={isAnimationActive}
    //     {...propsPieRechartCmp}
    //   />
    //   {labelProps && (
    //     <>
    //       {/* <Label
    //         position='center'
    //         content={<CustomLabel value={valueLabel} />}
    //       /> */}
    //       <Label {...labelProps} />
    //       {/* <LabelList
    //         fill='black'
    //         position='center'
    //         valueAccessor={() => 'center'}
    //       /> */}
    //     </>
    //   )}
    //   {/* <LabelList
    //     fill='black'
    //     position='center'
    //     valueAccessor={() => 'center'}
    //   /> */}
    // </PieChart>
    // -----
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx={cx}
          cy={cy}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          isAnimationActive={isAnimationActive}
          {...restPieProps}
        >
          {/* Auto render colors từ data.fill hoặc data.color */}
          {data.map((entry: any, index: number) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.fill || entry.color || '#8884d8'}
            />
          ))}

          {/* Render Label nếu có labelProps */}
          {labelProps && (
            <Label
              {...restLabelProps}
              {...(content ? { content: renderLabelContent } : {})}
            />
          )}
        </Pie>

        {/* Render Legend */}
        {legendContent ? (
          // Custom legend content
          <Legend
            content={() => (
              <div style={{ width: '100%', marginTop: 20 }}>
                {legendContent}
              </div>
            )}
            {...legendProps}
          />
        ) : legendProps ? (
          // Default Recharts legend với custom props
          <Legend {...legendProps} />
        ) : null}
      </PieChart>
    </ResponsiveContainer>
  );
}
