import PropTypes from 'prop-types';
import {useContext} from "react";
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import Iconify from '../../../components/iconify';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import ModeViewSwitch from "./ModeViewSwitch";
import AuthContext from "../../../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme, role }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg') && role !== 'Cliente']: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {


  const {user} = useContext(AuthContext);

  return (
    <StyledRoot role={user.tipoUsuario}>
      <StyledToolbar>
          {user.tipoUsuario !== 'Cliente' && <IconButton
              onClick={onOpenNav}
              sx={{
                  mr: 1,
                  color: 'text.primary',
                  display: { lg: 'none' },
              }}
          >
              <Iconify icon="eva:menu-2-fill" />
          </IconButton>}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <ModeViewSwitch />
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
