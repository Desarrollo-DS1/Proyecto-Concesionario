import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {Box, Link, Typography} from '@mui/material';
import typography from "../../theme/typography";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        mr: 1,
        ...sx,
      }}
      {...other}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 100 100"
            strokeWidth={1.5}
            stroke="currentColor"
        >
            <path
                d="M 67.359375 40.253906 L 67.359375 34.367188 L 32.59375 34.367188 L 32.59375 40.253906 L 10.738281 40.253906 L 1.46875 59.449219 L 32.589844 59.449219 L 32.589844 65.632812 L 67.359375 65.632812 L 67.359375 59.449219 L 88.871094 59.449219 L 98.527344 40.253906 Z M 84.847656 53.515625 L 62.273438 53.515625 L 62.273438 59.449219 L 38.054688 59.449219 L 38.054688 53.515625 L 10.738281 53.515625 L 14.386719 45.890625 L 38.054688 45.890625 L 38.054688 40.253906 L 62.273438 40.253906 L 62.273438 45.890625 L 88.871094 45.890625 Z M 84.847656 53.515625 "
            />
        </svg>
    </Box>
  );

  const logoText = (
      <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                  mr: 10,
                  flexGrow: 0,
                  fontWeight: 700,
                  letterSpacing: '.0rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  margin: '0 auto',
              }}
          >
              CHEVROLET
          </Typography>
      </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
        {logoText}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;