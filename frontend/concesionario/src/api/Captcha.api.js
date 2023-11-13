import axios from 'axios';

const captchaApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/'
});

export const verifyCaptcha = (captcha) => captchaApi.post('recaptcha/', {captcha_token: captcha});