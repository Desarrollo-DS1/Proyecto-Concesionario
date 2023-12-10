import axios from 'axios';

const usuarioApi = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/auth/`
}); 

export const createUsuario = (usuario) => usuarioApi.post('users/', usuario);

export const getUsuario = () => usuarioApi.get('users/me/');