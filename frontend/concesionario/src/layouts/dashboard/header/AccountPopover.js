import {useContext, useState} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import AuthContext from "../../../hooks/auth/AuthContext";


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'inicio',
    icon: 'eva:home-fill',
    href: '/dashboard'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const {
    logoutUser } = useContext(AuthContext);

  const { t } = useTranslation("lang");

  const [open, setOpen] = useState(null);

  const {user} = useContext(AuthContext);

  const name = user ? `${user.primerNombre}${" "}${user.primerApellido}` : 'Nombre';

  const email = user ? user.email : 'Cargo';

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogOut = () => {
    logoutUser();
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={'/broken-image.jpg'} alt={name} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />


        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose} to={user.tipoUsuario === "Cliente" ? "/cliente" : option.href} component={RouterLink}>
              {t(`general.perfil.${option.label}`)}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogOut} sx={{ m: 1 }} >
          {t('general.perfil.cerrarSesion')}
        </MenuItem>
      </Popover>
    </>
  );
}
