import {useContext, lazy, Suspense} from "react";
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import CircularProgress from '@mui/material/CircularProgress';
import DashboardLayout from './layouts/dashboard';
import CustomerLayout from './layouts/customer';
import SimpleLayout from './layouts/simple';
import LoadLayout from "./layouts/load/LoadLayout";
import Page404 from "./pages/Page404";
import AuthContext  from "./hooks/auth/AuthContext";

//
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardAppPage = lazy(() => import('./pages/DashboardAppPage'));

// Importa otros componentes con lazy
const CustomerPage = lazy(() => import('./pages/CustomerPage'));
const EmployeePage = lazy(() => import('./pages/EmployeePage'));
const ModelPage = lazy(() => import('./pages/ModelPage'));
const VehiclePage = lazy(() => import('./pages/VehiclePage'));
const SalePage = lazy(() => import('./pages/SalePage'));
const PricePage = lazy(() => import('./pages/PricePage'));
const SparePartPage = lazy(() => import('./pages/SparePartPage'));
const WorkOrderPage = lazy(() => import('./pages/WorkOrderPage'));
const CustomerOrderPage = lazy(() => import('./pages/CustomerOrderPage'));

// Importa estados con lazy
const CustomerState = lazy(() => import('./hooks/customer/CustomerState'));
const EmployeeState = lazy(() => import('./hooks/employee/EmployeeState'));
const ModelState = lazy(() => import('./hooks/model/ModelState'));
const VehicleState = lazy(() => import('./hooks/vehicle/VehicleState'));
const SaleState = lazy(() => import('./hooks/sale/SaleState'));
const PriceState = lazy(() => import('./hooks/price/PriceState'));
const SparePartState = lazy(() => import('./hooks/sparePart/SparePartState'));
const WorkOrderState = lazy(() => import('./hooks/workOrder/WorkOrderState'));
const CustomerOrderState = lazy(() => import('./hooks/customerOrder/CustomerOrderState'));



// ----------------------------------------------------------------------

const fallbackStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',  // Ajusta según tus necesidades
};


const AppSuspense = ({ children }) => (
    <Suspense fallback={<div style={fallbackStyles}><CircularProgress size={60} thickness={4} /></div>}>
      {children}
    </Suspense>
);

export default function Router() {

  const {user} = useContext(AuthContext)

  const redirectToLogin = () => <Navigate to="/login" replace />;
  const redirectToDashboard = () => <Navigate to="/dashboard" replace />;

  const redirectToCustomer = () => <Navigate to="/cliente" replace />;

  const routes = useRoutes([
    {
      path: '/login',
      element: <AppSuspense><LoginPage /></AppSuspense>,
    },
    {
      path: '/dashboard',
      element: user && user.tipoUsuario !== 'Cliente'  ? <DashboardLayout /> : redirectToLogin(),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <AppSuspense><DashboardAppPage /></AppSuspense> },
        { path: 'clientes', element: <AppSuspense><CustomerState><CustomerPage /></CustomerState></AppSuspense> },
        { path: 'empleados', element: <AppSuspense><EmployeeState><EmployeePage /></EmployeeState></AppSuspense> },
        { path: 'modelos', element: <AppSuspense><ModelState><ModelPage /></ModelState></AppSuspense> },
        { path: 'vehiculos', element: <AppSuspense><VehicleState><VehiclePage /></VehicleState></AppSuspense> },
        { path: 'ventas', element: <AppSuspense><SaleState><SalePage /></SaleState></AppSuspense> },
        { path: 'cotizaciones', element: <AppSuspense><PriceState><PricePage /></PriceState></AppSuspense> },
        { path: 'repuestos', element: <AppSuspense><SparePartState><SparePartPage /></SparePartState></AppSuspense>},
        { path: 'ordenes-trabajo', element: <AppSuspense><WorkOrderState><WorkOrderPage /> </WorkOrderState></AppSuspense>},
      ],
    },
    {
      path: '/cliente',
      element: user && user.tipoUsuario === 'Cliente'  ? <CustomerLayout /> : redirectToLogin(),
      children: [
        { element: <Navigate to="/cliente/ordenes" />, index: true },
        { path: 'ordenes', element: <AppSuspense><CustomerOrderState><CustomerOrderPage /></CustomerOrderState></AppSuspense>},
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