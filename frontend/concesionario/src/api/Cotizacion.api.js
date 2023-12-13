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

export const getCotizacionesPerMonth = (token, anho) => cotizacionApi(token).get(`cotizaciones_por_mes/`, { params: { anho } });

export const getModelosInCotizaciones = (token, anho) => cotizacionApi(token).get(`modelos_en_cotizaciones/`, { params: { anho} });

export const getCotizacionesPerBranch = (token, anho, mes) => cotizacionApi(token).get(`cotizaciones_por_sucursal/`, { params: { anho, mes } });

export const getColoresInCotizaciones = (token, anho, mes) => cotizacionApi(token).get(`colores_en_cotizacion/`, { params: { anho, mes } });

export const getAnnualCotizaciones = (token, anho) => cotizacionApi(token).get(`cotizaciones_anuales/`, { params: { anho } });

export const getNumberOfAnnualCotizaciones = (token, anho) => cotizacionApi(token).get(`numero_cotizaciones_anuales/`, { params: { anho } });

export const getMonthlyCotizaciones = (token, anho, mes) => cotizacionApi(token).get(`cotizaciones_mensuales/`, { params: { anho, mes } });

export const getNumberOfMonthlyCotizaciones = (token, anho, mes) => cotizacionApi(token).get(`numero_cotizaciones_mensuales/`, { params: { anho, mes } });