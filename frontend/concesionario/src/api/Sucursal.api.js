import axios from 'axios';

const sucursalApi = (token) => axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Sucursal/',
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllSucursales = (token) => sucursalApi(token).get('')

export const getSucursal = (id, token) => sucursalApi(token).get(`${id}/`)