import axios from 'axios'

const modeloApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Modelo/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllModelos = (token) => modeloApi(token).get('');

export const getModelo = (id, token) => modeloApi(token).get(`${id}/`);

export const createModelo = (modelo, token) => modeloApi(token).post('', modelo);

export const updateModelo = (id, modelo, token) => modeloApi(token).put(`${id}/`, modelo);

export const deleteModelo = (id, token) => modeloApi(token).delete(`${id}/`);