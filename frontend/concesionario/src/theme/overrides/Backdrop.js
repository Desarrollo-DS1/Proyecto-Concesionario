import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.background.backdrop, 0.5),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
