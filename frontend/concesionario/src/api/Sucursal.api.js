import axios from 'axios';

const sucursalApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Sucursal/',
    headers: localStorage.getItem('authTokens') ? { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}` } : null
})

export const getAllSucursales = () => sucursalApi.get('/')

export const getSucursal = (id) => sucursalApi.get(`/${id}/`)