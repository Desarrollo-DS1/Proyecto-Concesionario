import { Helmet } from 'react-helmet-async';
import {useTranslation} from "react-i18next";
// @mui
import {alpha, styled, useTheme} from '@mui/material/styles';
import {Typography, Divider, Stack, Button, Box, Card, Avatar} from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';
import {bgGradient} from "../utils/cssStyles";

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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const theme = useTheme();

  const { t , i18n} = useTranslation("lang");

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <Box
          sx={{
            ...bgGradient({
              color: alpha(theme.palette.background.default, 0.9),
              imgUrl: '/assets/background/overlay_4.jpg',
            }),
            height: 1,
          }}
      >
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
              sx={{
                p: 5,
                width: 1,
                maxWidth: 420,
              }}
          >
            <Box sx={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', mb: 3}}>
              <Logo disabledLink/>
            </Box>

            <Stack direction="row" spacing={2}>

              {LANGS.map((option) => (
                  <Button key={option.value} fullWidth color="inherit" variant="outlined" style={{ backgroundColor: option.value === i18n.language ? theme.palette.divider: 'transparent' }} onClick={() => handleLanguageChange(option.value)}>
                    <Avatar src={option.icon} alt={option.label} />
                  </Button>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h4" align={"center"} gutterBottom>
              {t("login.titulo")}
            </Typography>

            <LoginForm />
          </Card>
        </Stack>
      </Box>
    </>
  );
}
