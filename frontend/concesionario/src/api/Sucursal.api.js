import axios from 'axios';

const sucursalApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Sucursal/'
})

export const getAllSucursales = () => sucursalApi.get('/')

export const getSucursal = (id_sucursal) => sucursalApi.get(`/${id_sucursal}/`)

export const createSucursal = (sucursal) => sucursalApi.post('/', sucursal);

export const updateSucursal = (id_sucursal, sucursal) => sucursalApi.put(`/${id_sucursal}/`, sucursal);

export const deleteSucursal = (id_sucursal) => sucursalApi.delete(`/${id_sucursal}`);