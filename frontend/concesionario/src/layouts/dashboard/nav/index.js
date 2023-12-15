import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { styled, alpha } from '@mui/material/styles';
import {Box, Link, Drawer, Typography, Avatar, Divider, List} from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import AuthContext from "../../../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const chooseNavConfig = (user) => {
  if (user.tipoUsuario === 'Superusuario' || user.tipoUsuario === 'Gerente') {
    return navConfig;
  }

  if (user.tipoUsuario === 'Vendedor') {
    const navConfigSec = navConfig.filter((section) => section.section !== 'ubicaciones');

    const filteredNavConfig = navConfigSec.map((section) => {
      if (section.section === 'operaciones') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'ordenesTrabajo')
        };
      }
      if (section.section === 'usuarios') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'empleados')
        };
      }
      if (section.section === 'inventario') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'repuestos' && link.title !== 'modelos')
        };
      }
      return section;
    });

    return filteredNavConfig;
  }

  if (user.tipoUsuario === 'Jefe de Taller'){
    const navConfigSec = navConfig.filter((section) => section.section !== 'ubicaciones');

    const filteredNavConfig = navConfigSec.map((section) => {
      if (section.section === 'operaciones') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'ventas' && link.title !== 'cotizaciones')
        };
      }
      if (section.section === 'usuarios') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'empleados')
        };
      }
      if (section.section === 'inventario') {
        return {
          ...section,
          links: section.links.filter((link) => link.title !== 'modelos' && link.title !== 'vehiculos')
        };
      }
      return section;
    });

    return filteredNavConfig;
  }

  if (user.tipoUsuario === 'Cliente') {
    return [];
  }

  return navConfig;
};

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const {user} = useContext(AuthContext);

  const name = user ? `${user.primerNombre}${" "}${user.primerApellido}` : 'Nombre';

  const type = user ? user.tipoUsuario : 'Cargo';

  const { t } = useTranslation("lang");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={'/broken-image.jpg'} alt={name} />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {name}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t(`cargos.${type}`)}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={chooseNavConfig(user)} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
