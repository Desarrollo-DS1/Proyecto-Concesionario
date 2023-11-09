import axios from "axios";

const cotizacionApi = axios.create({
    baseURL: 'http://localhost:8000/concesionarioapp/api/v1/Cotizacion/'
})

export const getAllCotizaciones = () => cotizacionApi.get('/');

export const getCotizacion = (id) => cotizacionApi.get(`/${id}/`);

export const createCotizacion = (Cotizacion) => cotizacionApi.post('/', Cotizacion);

export const updateCotizacion = (id, Cotizacion) => cotizacionApi.put(`/${id}/`, Cotizacion);

export const deleteCotizacion = (id) => cotizacionApi.delete(`/${id}`);