import { MainLayout } from '@/core/components';
import React, {lazy} from 'react';
import type { RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('./pages/DashboardPage'))

export const dashboardRoutes: RouteObject[] = [
    {
        path: '/dashboard',
        element: (
        <MainLayout>
            <DashboardPage />
        </MainLayout>
    )
    }
];