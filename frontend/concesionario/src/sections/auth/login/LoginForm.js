import {createRef, useState} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Snackbar, Box} from '@mui/material';
import Alert from '@mui/material/Alert';
import {LoadingButton} from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import ModeViewSwitch from "../../../layouts/dashboard/header/ModeViewSwitch";

// ----------------------------------------------------------------------

export default function LoginForm() {

    const captchaRef = createRef(null);

    const [captcha, setCaptcha] = useState(null);

    const emptyData = {
        email: '',
        password: '',
    }

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(emptyData);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { t } = useTranslation("lang");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if(captchaRef.current.getValue())
        {
            navigate('/dashboard', { replace: true });
        }
        else
        {
            setErrorMessage(t('login.captcha'))
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    return (
        <>
          <Stack spacing={3}>
            <TextField
                name="email"
                label={t('login.correo')}
                value={formData.email}
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
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
