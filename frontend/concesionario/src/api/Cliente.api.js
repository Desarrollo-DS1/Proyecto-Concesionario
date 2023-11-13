import axios from 'axios';

const clienteApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Cliente/',
    headers: localStorage.getItem('authTokens') ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` } : null
});

export const getAllClientes = () => clienteApi.get('/');

export const getCliente = (id) => clienteApi.get(`/${id}/`);

export const createCliente = (cliente) => clienteApi.post('/', cliente);

export const updateCliente = (id, cliente) => clienteApi.put(`/${id}/`, cliente);

export const deleteCliente = (id) => clienteApi.delete(`/${id}/`);

