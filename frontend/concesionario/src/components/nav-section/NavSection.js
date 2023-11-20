import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import {Fragment} from "react";
// @mui
import {Box, Divider, List, ListItemText, Typography} from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

//

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {

  const { t } = useTranslation("lang");

  return (
      data.map((section) => (
          <Fragment key={section.section}>
              <Box sx={{ml: 2}}>
                  <Typography variant="subtitle1">{t(`general.secciones.${section.section}`)}</Typography>
              </Box>
              <Divider sx={{ width: '87%' , marginX: 'auto' }}/>
              <List disablePadding sx={{ p: 1 }}>
                  {section.links.map((item) => (
                      <NavItem key={item.title} item={item} />
                  ))}
              </List>
          </Fragment>
  )));
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  const { t } = useTranslation("lang");

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >

      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText sx={{textTransform: "none"}} disableTypography primary={t(`general.barraNavegacion.${title}`)} />

      {info && info}
    </StyledNavItem>
  );
}
