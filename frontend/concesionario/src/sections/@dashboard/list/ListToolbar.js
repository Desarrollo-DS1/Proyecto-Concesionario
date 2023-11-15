// prop-types
import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Chip, Box} from '@mui/material';
// translations
import {useTranslation} from "react-i18next";
// context
import {useContext} from "react";
// component
import FilterPopover from './FilterPopover';
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
  context: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default function ListToolbar(props) {

  const {
    filterName,
    handleFilterByName,
    selected,
    handleOpenFilter,
    filterField,
  }= useContext(props.context);

  const { t } = useTranslation("lang");

  return (
    <StyledRoot
      sx={{
        ...(selected.length > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography component="div" variant="subtitle1">
          {selected.length} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={handleFilterByName}
          placeholder={t("general.dataTable.buscar", {nombre: props.name})}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {selected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
          <Box sx={{display: "flex"}}>
            <Tooltip title={t('general.botones.filtroLista')}>
              <IconButton onClick={(event) => handleOpenFilter(event)}>
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
            <Chip label={t(`${props.title}.label.${filterField}`)} />
          </Box>

      )}
      <FilterPopover context={props.context} name={props.title}/>
    </StyledRoot>
  );
}
