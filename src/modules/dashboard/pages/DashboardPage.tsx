import React, { useState } from 'react';
import { Segmented, Space, Typography } from 'antd';
import { TAB_DASHBOARD, TAB_KEY } from '../constant/common.constant';
import {
  BackEndAnalytics,
  FrontEndAnalytics,
  PracticeExecutiveSummary,
} from '../components';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TAB_KEY>(TAB_KEY.PRACTICE);

  const tabContent: Record<TAB_KEY, React.ReactNode> = {
    [TAB_KEY.PRACTICE]: <PracticeExecutiveSummary />,
    [TAB_KEY.FRONTEND]: <FrontEndAnalytics />,
    [TAB_KEY.BACKEND]: <BackEndAnalytics />,
  };

  return (
    <div className='flex flex-col gap-6 px-6 py-4'>
      <Typography.Title level={5}>Dashboard</Typography.Title>

      <Space orientation='vertical' size={16} className='w-full'>
        <Segmented
          value={activeTab}
          onChange={(value) => setActiveTab(value as TAB_KEY)}
          options={TAB_DASHBOARD.map((tab) => ({
            label: tab.label,
            value: tab.key,
          }))}
          size='large'
        />

        <div className='rounded-lg bg-white p-6'>{tabContent[activeTab]}</div>
      </Space>
    </div>
  );
};

export default DashboardPage;
