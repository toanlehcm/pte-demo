import React from 'react';
import { Card, type CardProps } from 'antd';
import { cn } from '@/core/lib/utils';
// import { createStyles } from 'antd-style';

export const CardCmp: React.FC<CardProps> = ({
  children,
  className,
  styles,
  ...restProps
}) => {
  return (
    <Card
      className={cn(
        'rounded-lg bg-white',
        'shadow-[0px_4px_4px_-2px_rgba(0,0,0,0.02),0px_-1px_12px_-2px_rgba(0,0,0,0.03)]',
        className
      )}
      // styles={{
      //   header: {
      //     padding: '20px 20px',
      //     borderBottom: '1px solid #f0f0f0',
      //   },
      //   body: {
      //     padding: '16px',
      //   },
      //   ...styles, // Allow override
      // }}
      {...restProps}
    >
      {children}
    </Card>
  );
};
