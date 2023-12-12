import axios from "axios";

const AuthApi = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/auth/`
});

export const login = (login) => AuthApi.post('jwt/create/', login);


export const refresh = (refreshToken) => AuthApi.post('jwt/refresh/', { refresh: refreshToken });
    