import {useContext} from "react";
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import LoadLayout from "./layouts/load/LoadLayout";
//
import CustomerPage from './pages/CustomerPage';
import {CustomerState} from './hooks/customer/CustomerState';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import {EmployeeState} from "./hooks/employee/EmployeeState";
import EmployeePage from "./pages/EmployeePage";
import {ModelState} from "./hooks/model/ModelState";
import ModelPage from "./pages/ModelPage";
import {VehicleState} from "./hooks/vehicle/VehicleState";
import VehiclePage from "./pages/VehiclePage";
import AuthContext  from "./hooks/auth/AuthContext";

// ----------------------------------------------------------------------

export default function Router() {

  const {user} = useContext(AuthContext)

  const redirectToLogin = () => <Navigate to="/login" replace />;
  const redirectToDashboard = () => <Navigate to="/dashboard" replace />;

  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: user ? <DashboardLayout /> : redirectToLogin(),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'clientes', element: <CustomerState><CustomerPage /></CustomerState>},
        { path: 'empleados', element: <EmployeeState><EmployeePage /></EmployeeState> },
        { path: 'modelos', element: <ModelState><ModelPage /></ModelState> },
        { path: 'vehiculos', element: <VehicleState><VehiclePage /></VehicleState>}
      ],
    },
    {element: <LoadLayout />,
    children: [
        { element: <Navigate to="/login" />, index: true },
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
