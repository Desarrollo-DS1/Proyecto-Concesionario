import { Outlet } from 'react-router-dom';
// @mui
import {Box} from "@mui/material";
// components
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%)',}}>
        <Logo />
      </Box>

      <Outlet />
    </>
  );
}
