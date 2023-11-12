import axios from 'axios';

const usuarioApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/auth/'
}); 

export const createUsuario = (usuario) => usuarioApi.post('users/', usuario);

export const getUsuario = () => usuarioApi.get(`users/me/`);