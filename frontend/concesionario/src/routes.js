import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoadLayout from "./layouts/load/LoadLayout";
//
import BlogPage from './pages/BlogPage';
import CustomerPage from './pages/CustomerPage';
import {CustomerState} from './hooks/customer/CustomerState';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import {EmployeeState} from "./hooks/employee/EmployeeState";
import EmployeePage from "./pages/EmployeePage";
import {ModelState} from "./hooks/model/ModelState";
import ModelPage from "./pages/ModelPage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'clientes', element: <CustomerState><CustomerPage /></CustomerState>},
        { path: 'empleados', element: <EmployeeState><EmployeePage /></EmployeeState> },
        { path: 'modelos', element: <ModelState><ModelPage /></ModelState> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {element: <LoadLayout />,
    children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'load', element: <LoadLayout /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
