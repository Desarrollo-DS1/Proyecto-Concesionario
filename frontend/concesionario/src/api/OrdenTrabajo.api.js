import axios from "axios";

const OrdenTrabajoApi = (token) => axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}concesionarioapp/api/v1/Orden_Trabajo/`,
    headers: { Authorization: `Bearer ${token}` }
});

export const getAllOrdenTrabajos = (token) => OrdenTrabajoApi(token).get('');

export const getOrdenTrabajo = (id, token) => OrdenTrabajoApi(token).get(`${id}/`);

export const createOrdenTrabajo = (ordenTrabajo, token) => OrdenTrabajoApi(token).post('', ordenTrabajo);

export const updateOrdenTrabajo = (id, ordenTrabajo, token) => OrdenTrabajoApi(token).put(`${id}/`, ordenTrabajo);

export const deleteOrdenTrabajo = (id, token) => OrdenTrabajoApi(token).delete(`${id}/`);

