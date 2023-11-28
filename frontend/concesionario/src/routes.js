import {useContext} from "react";
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import CustomerLayout from './layouts/customer';
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
import {SaleState} from "./hooks/sales/SaleState";
import SalePage from "./pages/SalePage";
import SparePartPage from "./pages/SparePartPage";
import {SparePartState} from "./hooks/sparePart/SparePartState";
import WorkOrderPage from "./pages/WorkOrderPage";
import {WorkOrderState} from "./hooks/workOrder/WorkOrderState";
import CustomerOrderPage from "./pages/CustomerOrderPage";
import {CustomerOrderState} from "./hooks/customerOrder/CustomerOrderState";

// ----------------------------------------------------------------------

export default function Router() {

  const {user} = useContext(AuthContext)

  const redirectToLogin = () => <Navigate to="/login" replace />;
  const redirectToDashboard = () => <Navigate to="/dashboard" replace />;

  const redirectToCustomer = () => <Navigate to="/cliente" replace />;

  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: user && user.tipoUsuario !== 'Cliente'  ? <DashboardLayout /> : redirectToLogin(),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'clientes', element: <CustomerState><CustomerPage /></CustomerState>},
        { path: 'empleados', element: <EmployeeState><EmployeePage /></EmployeeState> },
        { path: 'modelos', element: <ModelState><ModelPage /></ModelState> },
        { path: 'vehiculos', element: <VehicleState><VehiclePage /></VehicleState>},
        { path: 'ventas', element: <SaleState><SalePage /></SaleState>},
        { path: 'repuestos', element: <SparePartState><SparePartPage /></SparePartState>},
        { path: 'ordenes-trabajo', element: <WorkOrderState><WorkOrderPage /> </WorkOrderState>},
      ],
    },
    {
      path: '/cliente',
      element: user && user.tipoUsuario === 'Cliente'  ? <CustomerLayout /> : redirectToLogin(),
      children: [
        { element: <Navigate to="/cliente/ordenes" />, index: true },
        { path: 'ordenes', element: <CustomerOrderState><CustomerOrderPage /></CustomerOrderState>},
      ],
    },
    {element: <LoadLayout />,
    children: [
        { element: user && user.tipoUsuario !== 'Cliente' ? redirectToDashboard() : <Navigate to="/login" />, index: true },
        { element: user && user.tipoUsuario === 'Cliente' ? redirectToCustomer() : <Navigate to="/login" />, index: true },
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