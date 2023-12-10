import axios from 'axios';

const captchaApi = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/`
});

export const verifyCaptcha = (captcha) => captchaApi.post('recaptcha/', {captcha_token: captcha});