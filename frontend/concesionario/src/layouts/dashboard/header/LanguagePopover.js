import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';
import i18n from "../../../i18n";

// ----------------------------------------------------------------------

const LANGS = [
   {
     value: 'es',
     label: 'Español',
     icon: '/assets/icons/es.png',
   },
  {
    value: 'en',
    label: 'Inglés',
    icon: '/assets/icons/en.png',
  },
  {
    value: 'pt',
    label: 'Portugués',
    icon: '/assets/icons/pt.png',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {

  const [icon, setIcon] = useState(LANGS[0].icon);
  const [open, setOpen] = useState(null);

  const handleLanguageChange = (lang, icon) => {
        i18n.changeLanguage(lang);
        setIcon(icon);
        handleClose();
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { t, i18n } = useTranslation("lang");

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={icon} alt={i18n.language} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
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
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === i18n.language} onClick={() => handleLanguageChange(option.value, option.icon)}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />
              {t(`general.lenguajes.${option.value}`)}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
