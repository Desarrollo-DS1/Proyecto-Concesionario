// component
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import HandymanIcon from '@mui/icons-material/Handyman';
import SellIcon from '@mui/icons-material/Sell';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import PlaceIcon from '@mui/icons-material/Place';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashBoard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'clientes',
    path: '/dashboard/clientes',
    icon: <PersonIcon/>,
  },
  {
    title: 'empleados',
    path: '/dashboard/empleados',
    icon: <BadgeIcon/>,
  },
  {
    title: 'modelos',
    path: '/dashboard/modelos',
    icon: <CarRepairIcon/>,
  },
  {
    title: 'vehiculos',
    path: '/dashboard/vehiculos',
    icon: <DirectionsCarIcon/>,
  },
  {
    title: 'repuestos',
    path: '/dashboard/respuestos',
    icon: <PlumbingIcon/>,
  },
  {
    title: 'ordenesTrabajo',
    path: '/dashboard/ordenes-trabajo',
    icon: <HandymanIcon/>,
  },
  {
    title: 'ventas',
    path: '/dashboard/ventas',
    icon: <SellIcon/>,
  },
  {
    title: 'cotizaciones',
    path: '/dashboard/cotizaciones',
    icon: <RequestQuoteIcon/>,
  },
  {
    title: 'sucursales',
    path: '/dashboard/sucursales',
    icon: <PlaceIcon/>
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
