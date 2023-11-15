import axios from 'axios';

const clienteApi = (token) => axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Cliente',
    headers: { Authorization: `Bearer ${token}` }}
);

export const getAllClientes = (token) => clienteApi(token).get('/')

export const getCliente = (id, token) => clienteApi(token).get(`/${id}/`)

export const createCliente = (cliente, token) => clienteApi(token).post('/', cliente);

export const updateCliente = (id, cliente, token) => clienteApi(token).put(`/${id}/`, cliente);

export const deleteCliente = (id, token) => clienteApi(token).delete(`/${id}/`);

