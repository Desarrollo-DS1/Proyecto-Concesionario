import { Helmet } from 'react-helmet-async';
import {useContext} from "react";
import { Link as RouterLink } from 'react-router-dom';
import {styled, useTheme} from '@mui/material/styles';
import { Button, Typography, Container} from '@mui/material';
import {useTranslation} from "react-i18next";
import AuthContext from "../hooks/auth/AuthContext";

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {

  const {user} = useContext(AuthContext);

  const theme = useTheme();

  const {t} = useTranslation("lang");

  return (
    <>
      <Helmet>
        <title>{t('404.titulo')}</title>
      </Helmet>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            {t('404.subtitulo')}
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            {t('404.mensaje')}
          </Typography>

          <Typography mt={8} mb={8}  fontSize={"10rem"} color={theme.palette.primary.main} fontFamily={"Arial"} fontWeight={"bold"} >
            4O4
          </Typography>

          <Button to={user.tipoUsuario === "Cliente" ? "/cliente" : "/dashboard"} size="large" variant="contained" component={RouterLink}>
            {t('404.boton')}
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
