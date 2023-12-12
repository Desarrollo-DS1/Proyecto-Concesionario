import axios from 'axios';


const ventaApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Venta/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllVentas = (token) => ventaApi(token).get('');

export const getVenta = (id, token) => ventaApi(token).get(`${id}/`);

export const createVenta = (venta, token) => ventaApi(token).post('', venta);

export const updateVenta = (id, venta, token) => ventaApi(token).put(`${id}/`, venta);
