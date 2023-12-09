import axios from "axios";

const cotizacionApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Cotizacion/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllCotizaciones = (token) => cotizacionApi(token).get('');

export const getCotizacion = (id, token) => cotizacionApi(token).get(`${id}/`);

export const createCotizacion = (cotizacion, token) => cotizacionApi(token).post('', cotizacion);

export const updateCotizacion = (id, cotizacion, token) => cotizacionApi(token).put(`${id}/`, cotizacion);

export const deleteCotizacion = (id, token) => cotizacionApi(token).delete(`${id}/`);