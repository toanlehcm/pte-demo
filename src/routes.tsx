import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { dashboardRoutes } from './modules/dashboard';

const routes = [
    {
        path: '/',
        element: (
            <Navigate to="/dashboard" />
        )
    },
    ...dashboardRoutes
];

export const AppRouter = () => {
  const router = createBrowserRouter(routes, { basename: '/' });

  return <RouterProvider router={router} />;
}
