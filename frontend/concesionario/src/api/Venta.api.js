import axios from 'axios';


const ventaApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Venta/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllVentas = (token) => ventaApi(token).get('');

export const getVenta = (id, token) => ventaApi(token).get(`${id}/`);

export const createVenta = (venta, token) => ventaApi(token).post('', venta);

export const updateVenta = (id, venta, token) => ventaApi(token).put(`${id}/`, venta);

export const getVentasPerMonth = (token, anho) => ventaApi(token).get(`ventas_por_mes/`, { params: { anho } });

export const getModelosInVentas = (token, anho) => ventaApi(token).get(`modelos_en_ventas/`, { params: { anho} });

export const getVentasPerBranch = (token, anho, mes) => ventaApi(token).get(`ventas_por_sucursal/`, { params: { anho, mes } });

export const getExtrasInVentas = (token, anho, mes) => ventaApi(token).get(`extras_en_ventas/`, { params: { anho, mes } });

export const getAnnualVentas = (token, anho) => ventaApi(token).get(`ventas_anuales/`, { params: { anho } });

export const getNumberOfAnnualVentas = (token, anho) => ventaApi(token).get(`numero_ventas_anuales/`, { params: { anho } });

export const getMonthlyVentas = (token, anho, mes) => ventaApi(token).get(`ventas_mensuales/`, { params: { anho, mes } });

export const getNumberOfMonthlyVentas = (token, anho, mes) => ventaApi(token).get(`numero_ventas_mensuales/`, { params: { anho, mes } });
