import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { MenuItem, Stack, Popover } from '@mui/material';

// ----------------------------------------------------------------------

export default function FilterPopover(props) {

  const { t, i18n } = useTranslation("lang");

  const [open, setOpen] = useState(null);

    const {
        FILTER_OPTIONS,
        openFilter,
        handleCloseFilter,
        filterField,
        handleFilterField,
    }= useContext(props.context);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Popover
        open={Boolean(openFilter)}
        anchorEl={openFilter}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
            {FILTER_OPTIONS.map((option) => (
                <MenuItem key={option.id} selected={option.id === filterField} onClick={(event)=>handleFilterField(event, option.id)} >
                    {t(`${props.name}.label.${option.label}`)}
                </MenuItem>
            ))}
        </Stack>
      </Popover>
    </>
  );
}
