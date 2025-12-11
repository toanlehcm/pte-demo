import React from 'react';
import { MetricCard } from '@/core/components';
import { Col, Row, Space } from 'antd';
import { TREND_STATISTIC } from '@/core/components/constant';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: 24, background: '#f5f5f5' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        {/* Test 1: Appointment Fill Rate */}
        <MetricCard
          title='Appointment Fill Rate'
          value={75.0}
          suffix='%'
          precision={2}
          subtitle='X appointments of Y appointments available booked'
        />

        {/* Test 2: MetricCard with trend */}
        <MetricCard
          title='Total Collection'
          value={3500.0}
          prefix='$'
          precision={2}
          trend={{
            value: 200,
            type: TREND_STATISTIC.INCREASE,
            period: 'from previous 28 days',
          }}
        />

        {/* Test 3: Row of 4 MetricCards (like design) */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title='Appointment Fill Rate'
              value={75.0}
              suffix='%'
              precision={2}
              subtitle='150 appointments of 200 appointments available booked'
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title='Total Collection'
              value={3500.0}
              prefix='$'
              precision={2}
              trend={{
                value: 200,
                type: TREND_STATISTIC.INCREASE,
                period: 'from previous 28 days',
              }}
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title='Applied Payments'
              value={2700.0}
              prefix='$'
              precision={2}
              trend={{
                value: 800,
                type: TREND_STATISTIC.DECREASE,
                period: 'from previous 28 days',
              }}
            />
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <MetricCard
              title='Gross Charge'
              value={3500}
              prefix='$'
              precision={2}
              trend={{
                value: 200,
                type: TREND_STATISTIC.INCREASE,
                period: 'from previous 28 days',
              }}
            />
          </Col>
        </Row>

        {/* Test 4: DSO */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <MetricCard
              title='Total A/R'
              value={3500}
              prefix='$'
              precision={2}
              bordered={false}
              hoverable
            />
          </Col>

          <Col xs={24} md={12}>
            <MetricCard
              title='DSO'
              value={123}
              suffix=' days'
              size='small'
              loading={false}
            />
          </Col>
        </Row>

        {/* Test 5: Multiple cards in a row */}
        <MetricCard
          title='Insurance A/R'
          value={500}
          prefix='$'
          precision={2}
          valueClassName='text-5xl text-blue-600'
        />
      </Space>
    </div>
  );
};

export default DashboardPage;
