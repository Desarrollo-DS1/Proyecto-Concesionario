import axios from 'axios';

const sucursalApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Sucursal/'
})

export const getAllSucursales = () => sucursalApi.get('/')

export const getSucursal = (id) => sucursalApi.get(`/${id}/`)