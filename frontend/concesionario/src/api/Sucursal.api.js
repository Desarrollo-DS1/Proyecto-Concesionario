import axios from 'axios';

const sucursalApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Sucursal/`,
    headers: { Authorization: `Bearer ${token}` }
})

export const getAllSucursales = (token) => sucursalApi(token).get('')

export const getSucursal = (idSucursal, token) => sucursalApi(token).get(`/${idSucursal}/`);

export const createSucursal = (sucursal, token) => sucursalApi(token).post('', sucursal);

export const updateSucursal = (idSucursal, sucursal, token) => sucursalApi(token).put(`${idSucursal}/`, sucursal);

export const deleteSucursal = (idSucursal, token) => sucursalApi(token).delete(`${idSucursal}/`);
