import axios from "axios";

const AuthApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/auth/'
});

export const login = (login) => AuthApi.post('/jwt/create/', login);

export const refresh = (refresh) => AuthApi.post('/jwt/refresh/', refresh);


