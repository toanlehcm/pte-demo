import React from 'react';
import { StatisticCard } from '@/core/components';
import { Card, Col, Row, Space } from 'antd';
import { TREND_STATISTIC } from '@/core/components/constant';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: 24, background: '#f5f5f5' }}>
      <Space direction='vertical' size='large' style={{ width: '100%' }}>
        {/* Test 1: Appointment Fill Rate */}
        <Card>
          <StatisticCard
            value={75.0}
            suffix='%'
            precision={2}
            subtitle='of appointments available booked'
          />
        </Card>

        <Card>
          <StatisticCard value={150} subtitle='appointments missed' />
        </Card>

        <Card>
          <StatisticCard value={400} subtitle='double-booked appointments' />
        </Card>

        {/* Test 2: Total Collection với trend */}
        <Card>
          <StatisticCard
            title='Gross Charge'
            value={3500.0}
            prefix='$'
            precision={2}
            trend={{
              value: 200,
              type: TREND_STATISTIC.INCREASE,
              period: 'from previous 28 days',
            }}
          />
        </Card>

        {/* Test 3: Applied Payments với trend */}
        <Card>
          <StatisticCard
            title='Post-Deductions'
            value={2700.0}
            prefix='$'
            precision={2}
            trend={{
              value: 800,
              type: TREND_STATISTIC.DECREASE,
              period: 'from previous 28 days',
            }}
          />
        </Card>

        {/* Test 4: DSO */}
        <Card>
          <StatisticCard title='DSO' value={123} suffix=' days' />
        </Card>

        {/* Test 5: Multiple cards in a row */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <StatisticCard
                title='Total A/R'
                value={3500}
                prefix='$'
                precision={2}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <StatisticCard
                value={500}
                prefix='$'
                precision={2}
                subtitle='Insurance A/R'
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <StatisticCard title='DSO' value={123} suffix=' days' />
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default DashboardPage;
