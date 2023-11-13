import axios from 'axios'

const modeloApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Modelo/',
    headers: localStorage.getItem('authTokens') ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` } : null
})

export const getAllModelos = () => modeloApi.get('/');

export const getModelo = (id) => modeloApi.get(`/${id}/`);

export const createModelo = (modelo) => modeloApi.post('/', modelo);

export const updateModelo = (id, modelo) => modeloApi.put(`/${id}/`, modelo);

export const deleteModelo = (id) => modeloApi.delete(`/${id}`);