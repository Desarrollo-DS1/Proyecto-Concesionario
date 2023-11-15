import {createRef, useContext, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Snackbar, Box} from '@mui/material';
import Alert from '@mui/material/Alert';

// components
import {LoadingButton} from "@mui/lab";
import AuthContext  from "../../../hooks/auth/AuthContext";

import Iconify from '../../../components/iconify';
import ModeViewSwitch from "../../../layouts/dashboard/header/ModeViewSwitch";



// ----------------------------------------------------------------------

export default function LoginForm() {

    const {
        formData,
        showPassword,
        snackbarOpen,
        errorMessage,
        captchaRef,
        handleInputChange,
        handleLogin,
        handleCloseSnackbar,
        setShowPassword,
        } = useContext(AuthContext);

    const navigate = useNavigate();

    const { t } = useTranslation("lang");

    return (
        <>
          <Stack spacing={3}>
            <TextField
                name="cedula"
                label={t('login.cedula')}
                value={formData.cedula}
                onChange={handleInputChange} />

            <TextField
              name="password"
              label={t('login.contraseña')}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <ModeViewSwitch />
            <Link variant="subtitle2" underline="hover">
                {t('login.olvido')}
            </Link>
          </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6LcaL_8oAAAAAJeOInJCbKTOAjuxqAb_ajK49G4L"/>
            </Box>


          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
              {t('login.boton')}
          </LoadingButton>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} // Duración en milisegundos que el Snackbar estará abierto
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%', fontSize: '1.2rem', padding: '20px' }}>
                    {t(errorMessage)}
                </Alert>
            </Snackbar>
        </>
    );
}
